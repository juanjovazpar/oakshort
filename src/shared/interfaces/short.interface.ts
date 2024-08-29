import { Document } from 'mongoose';

interface IShort {
  lastRead: Date;
  active: boolean;
  target: string;
  short: string;
  accessCount: number;
  createdAt: Date;
  updatedAt: Date;
  accessAttendsOverLimit: number;
  _id?: string;
  owner?: string;
  firstRead?: Date;
  deleted?: boolean;
  expires?: Date;
  activation?: Date;
  password?: string;
  accessLimit?: number;
  name?: string;
}

interface IShortUpdate extends Omit<IShort, 'owner' | 'created' | 'short'> {}

export { IShort, IShortUpdate };