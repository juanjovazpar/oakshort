import { Document } from 'mongoose';

interface IUser extends Document {
  email: string;
  password: string;
  name: string;
  isVerified: boolean;
  verificationToken?: string;
  resetPasswordToken?: string;
  last_login?: Date;
}

export { IUser };
