import mongoose, { Schema, Model } from 'mongoose';
import { IVisit } from '../../../shared/interfaces/visit.interface';

const schema: Schema<IVisit> = new mongoose.Schema(
  {
    ip: {
      type: String,
      required: true,
    },
    userAgent: {
      type: String,
      required: true,
    },
    referrer: {
      type: String,
      required: true,
    },
    geoLocation: {
      type: String,
      required: true,
    },
    deviceType: {
      type: String,
      required: true,
    },
    language: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

const blockUpdates = (next: (err?: Error) => void) =>
  next(new Error('Updates are not allowed on Visit.'));

schema.pre('findOneAndUpdate', blockUpdates);
schema.pre('updateOne', blockUpdates);
schema.pre('updateMany', blockUpdates);
schema.pre('save', function (next) {
  if (!this.isNew) {
    return blockUpdates(next);
  }
  next();
});

const Visit: Model<IVisit> = mongoose.model<IVisit>('Visit', schema);

export default Visit;
