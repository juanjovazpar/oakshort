import mongoose, { Document, Schema, Model } from 'mongoose';

import { idGenerator } from '../utils/idGenerator';
import { isValidURL } from '../utils/url.utils';
import { isFutureDate } from '../utils/dates.utils';

interface IShort extends Document {
  owner?: string;
  firstRead: Date;
  lastRead: Date;
  active: boolean;
  target: string;
  short: string;
  accessCount: number;
  deleted?: boolean;
  expires?: Date;
  activation?: Date;
  password?: string;
}

interface IShortUpdate extends Omit<IShort, 'owner' | 'created' | 'short'> {}

const forbiddenFieldsToUpdate = ['owner', 'created', 'short'];

const schema: Schema<IShort> = new mongoose.Schema(
  {
    owner: {
      type: String,
    },
    firstRead: {
      type: Date,
    },
    lastRead: {
      type: Date,
    },
    active: {
      type: Boolean,
      required: true,
      default: true,
    },
    target: {
      type: String,
      required: [true, 'Target is required'],
      validate: {
        validator: isValidURL,
        message: (props) => `${props.value} is not a valid URL`,
      },
    },
    short: {
      type: String,
      unique: true,
      index: true,
      default: idGenerator,
    },
    accessCount: {
      type: Number,
      default: 0,
    },
    deleted: {
      type: Boolean,
      required: true,
      default: false,
    },
    expires: {
      type: Date,
      validate: {
        validator: isFutureDate,
        message: (props) => `${props.value} data has expired already`,
      },
    },
    activation: {
      type: Date,
      validate: {
        validator: isFutureDate,
        message: (props) => `${props.value} data has past already`,
      },
    },
    password: {
      type: String,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

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

// schema.pre('findOneAndUpdate', edit.bind(schema));
schema.pre('updateOne', edit.bind(schema));
schema.pre('updateMany', edit.bind(schema));

const Short: Model<IShort> = mongoose.model<IShort>('Short', schema);

export { Short, IShort };
