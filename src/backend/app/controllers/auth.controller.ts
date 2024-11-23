import { FastifyRequest, FastifyReply } from 'fastify';

import User from '../models/user.model';
import { IUser } from '../../../shared/interfaces/user.interface';
import {
  hashPassword,
  comparePasswords,
} from '../../../shared/utils/password.util';
import { getHashedToken } from '../../../shared/utils/token.util';
import { PARAMS } from '../../../shared/routes';
import { IResponse } from '../../../shared/interfaces/response.interface';
import { CODES } from '../../../shared/constants/http.codes';
import { validateBody } from '../../../shared/validators/form.validator';
import { requestErrorHandler } from '../../../shared/utils/requestErrorHandler.util';

interface ISignupBody {
  email: string;
  password: string;
}

interface IForgotPasswordBody {
  email: string;
}

interface IResetPasswordBody {
  password: string;
}

export const register = async (
  req: FastifyRequest<{ Body: ISignupBody }>,
  res: FastifyReply
): Promise<IResponse> => {
  const errorMessage: string = 'Error creating new user';
  try {
    const { email, password } = req.body;

    validateBody({ email, password });

    const hashedPassword = await hashPassword(password);
    const newUser: IUser = new User({
      email,
      password: hashedPassword,
    });

    await newUser.save();

    return res
      .status(CODES.Created)
      .send({ message: 'User created successfully' });
  } catch (error: any) {
    return res
      .status(
        error.isOperational ? CODES.BadRequest : CODES.InternalServerError
      )
      .send({
        error: requestErrorHandler(error),
        message: errorMessage,
      });
  }
};

export const signin = async function (
  req: FastifyRequest<{ Body: ISignupBody }>,
  res: FastifyReply
): Promise<IResponse> {
  const errorMessage: string = 'Error authenticating user';
  try {
    const { email, password } = req.body;
    const user: IUser | null = await User.findOne({ email });

    if (!user) {
      return res
        .status(CODES.NotFound)
        .send({ message: 'Authentication failed. User not found.' });
    }

    if (!user.isVerified) {
      return res
        .status(CODES.Unauthorized)
        .send({ message: 'Authentication failed. User not verified.' });
    }

    const passwordMatch: boolean = await comparePasswords(
      password,
      user.password
    );

    if (!passwordMatch) {
      return res
        .status(CODES.Unauthorized)
        .send({ message: 'Authentication failed. Incorrect password.' });
    }

    const token = req.server.jwt.sign({ sub: user._id, role: [] });

    user.last_login = new Date();
    await user.save();

    return res.status(CODES.Accepted).send({ token });
  } catch (error: any) {
    return res
      .status(
        error.isOperational ? CODES.BadRequest : CODES.InternalServerError
      )
      .send({
        error: requestErrorHandler(error),
        message: errorMessage,
      });
  }
};

export const verify = async (
  req: FastifyRequest,
  res: FastifyReply
): Promise<IResponse> => {
  const errorMessage: string = 'Error verifying user';
  try {
    const { [PARAMS.VERIFICATION_TOKEN]: verificationToken } = req.params as {
      [PARAMS.VERIFICATION_TOKEN]: string;
    };
    const user: IUser | null = await User.findOneAndUpdate(
      { verificationToken },
      {
        $set: { isVerified: true },
        $unset: { verificationToken: null },
      },
      { new: true }
    );

    if (!user) {
      return res
        .status(CODES.NotFound)
        .send({ message: 'Wrong verification token' });
    }

    return res
      .status(CODES.Accepted)
      .send({ message: 'Account verified successfully' });
  } catch (error) {
    return res.send({
      error: requestErrorHandler(error),
      message: errorMessage,
    });
  }
};

export const forgotPassword = async (
  req: FastifyRequest<{ Body: IForgotPasswordBody }>,
  res: FastifyReply
): Promise<IResponse> => {
  const errorMessage: string = 'Error requestion no reset password';
  try {
    const { email } = req.body;
    const resetPasswordToken = await getHashedToken(60 * 60 * 1000);
    const user: IUser | null = await User.findOneAndUpdate(
      { email },
      {
        $set: { resetPasswordToken },
      },
      { new: true }
    );

    if (!user) {
      return res.status(CODES.NotFound).send({ message: 'User not found.' });
    }

    // TODO: Send email with reset password token

    return res
      .status(CODES.Accepted)
      .send({ message: 'Reset password token sent successfully' });
  } catch (error) {
    return res.send({
      error: requestErrorHandler(error),
      message: errorMessage,
    });
  }
};

export const resetPassword = async (
  req: FastifyRequest<{ Body: IResetPasswordBody }>,
  res: FastifyReply
): Promise<IResponse> => {
  const errorMessage: string = 'Error reseting password';
  try {
    const { [PARAMS.RESET_TOKEN]: resetPasswordToken } = req.params as {
      [PARAMS.RESET_TOKEN]: string;
    };
    const { password } = req.body;

    validateBody({ password });

    const user: IUser | null = await User.findOneAndUpdate(
      { resetPasswordToken },
      {
        $set: { password },
        $unset: { resetPasswordToken: null },
      },
      { new: true }
    );

    if (!user) {
      return res
        .status(CODES.NotFound)
        .send({ message: 'Wrong reset password token' });
    }

    return res
      .status(CODES.Accepted)
      .send({ message: 'Password reset successfully' });
  } catch (error) {
    return res.send({
      error: requestErrorHandler(error),
      message: errorMessage,
    });
  }
};

export const whoami = async (
  req: any,
  res: FastifyReply
): Promise<IResponse> => {
  const errorMessage: string = 'Error reseting password';
  try {
    const owner = req.user?.sub;
    const user: IUser | null = await User.findById(owner)
      .select(['name', 'email', 'createdAt', 'updatedAt', 'last_login', '-_id'])
      .lean();

    if (!user) {
      return res
        .status(CODES.NotFound)
        .send({ message: 'Authentication failed. User not found.' });
    }

    return res.status(CODES.Accepted).send({ user });
  } catch (error) {
    return res.send({
      error: requestErrorHandler(error),
      message: errorMessage,
    });
  }
};
