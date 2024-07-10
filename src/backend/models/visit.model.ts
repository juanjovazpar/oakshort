import mongoose, { Document, Schema, Model } from 'mongoose';

interface IVisit extends Document {
  ip: string;
  userAgent: string;
  referrer: string;
  geoLocation: string;
  timestamp: Date;
  deviceType: string;
  language: string;
}

const schema: Schema<IVisit> = new mongoose.Schema({
  ip: { type: String, required: true },
  userAgent: { type: String, required: true },
  referrer: { type: String, required: true },
  geoLocation: { type: String, required: true },
  timestamp: { type: Date, required: true, default: Date.now() },
  deviceType: { type: String, required: true },
  language: { type: String, required: true },
});

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

export { Visit, IVisit };
