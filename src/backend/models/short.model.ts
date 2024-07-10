import mongoose, { Document, Schema, Model } from 'mongoose';
import getShort from '../utils/shortGenerator.util';

interface IShort extends Document {
  owner: string;
  created: Date;
  updated: Date;
  firstRead: Date;
  lastRead: Date;
  active: boolean;
  target: string;
  short: string;
  accessCount: number;
  deleted: boolean;
}

interface IShortUpdate extends Omit<IShort, 'owner' | 'created' | 'short'> {}

const forbiddenFieldsToUpdate = ['owner', 'created', 'short'];

function edit(this: any, next: (err?: Error) => void) {
  const update = this.getUpdate() as IShortUpdate;

  this.model.findOne(this.getQuery(), (err: any, doc: IShort) => {
    if (err) return next(err);
    if (doc?.deleted) {
      return next(new Error('Cannot update a deleted entity.'));
    }

    for (let field of forbiddenFieldsToUpdate) {
      if (update[field as keyof IShortUpdate] !== undefined) {
        return next(new Error(`Cannot update the ${field} field.`));
      }
    }

    next();
  });
}

const schema: Schema<IShort> = new mongoose.Schema({
  owner: { type: String, required: true },
  created: { type: Date, required: true, default: Date.now() },
  updated: { type: Date },
  firstRead: { type: Date },
  lastRead: { type: Date },
  active: { type: Boolean, required: true, default: true },
  target: { type: String, required: true },
  short: { type: String, required: true, unique: true, index: true },
  accessCount: { type: Number, default: 0 },
  deleted: { type: Boolean, required: true, default: false },
});

schema.pre('findOneAndUpdate', edit.bind(schema));
schema.pre('updateOne', edit.bind(schema));
schema.pre('updateMany', edit.bind(schema));
schema.pre('save', function (next) {
  if (!this.isNew) {
    return edit.bind(schema)(next);
  }

  if (!this.short) {
    this.short = getShort();
  }

  next();
});

const Short: Model<IShort> = mongoose.model<IShort>('Short', schema);

export { Short, IShort };
