import { Document } from 'mongoose';

interface IVisit extends Document {
  ip: string;
  userAgent: string;
  referrer: string;
  geoLocation: string;
  deviceType: string;
  language: string;
}

export { IVisit };
