import mongoose, { Document, Schema, Model, CallbackError } from 'mongoose';

import { isValidEmail } from '../utils/email';
import { getHashedToken } from '../utils/token.util';

interface IUser extends Document {
  email: string;
  password: string;
  name: string;
  isVerified: boolean;
  verificationToken?: string;
  resetPasswordToken?: string;
  last_login?: Date;
}

const schema: Schema<IUser> = new Schema(
  {
    email: {
      type: String,
      unique: true,
      trim: true,
      lowercase: true,
      required: [true, 'Email is required'],
      validate: {
        validator: isValidEmail,
        message: (props) => `${props.value} is not a valid email format`,
      },
    },
    password: {
      type: String,
      required: [true, 'User is required'],
    },
    name: {
      type: String,
      default: 'Unknown',
    },
    isVerified: {
      type: Boolean,
      required: true,
      default: false,
    },
    verificationToken: {
      type: String,
      unique: true,
    },
    resetPasswordToken: {
      type: String,
    },
    last_login: {
      type: Date,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

schema.pre<IUser>('save', async function (next) {
  try {
    if (this.isNew) {
      const hashedVerificationToken = await getHashedToken();
      this.verificationToken = hashedVerificationToken;
    }

    next();
  } catch (error) {
    next(error as CallbackError);
  }
});

const User: Model<IUser> = mongoose.model<IUser>('User', schema);

export { User, IUser };