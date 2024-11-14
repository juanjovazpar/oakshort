import { FastifyRequest, FastifyReply } from 'fastify';

import User from '../models/user.model';
import { IUser } from '../../shared/interfaces/user.interface';
import {
  hashPassword,
  comparePasswords,
  isValidPassword,
  PASSWORD_RULES,
} from '../../shared/utils/password.util';
import { getJWToken } from '../../shared/utils/token.util';
import { PARAMS } from '../../shared/routes';

interface SignupBody {
  email: string;
  password: string;
}

interface ForgotPasswordBody {
  email: string;
}

export const signup = async (
  req: FastifyRequest<{ Body: SignupBody }>,
  res: FastifyReply
): Promise<Response | void> => {
  try {
    const { email, password } = req.body;

    if (!password || !isValidPassword(password)) {
      res.status(400).send({
        message: `This is not a valid password format. ${PASSWORD_RULES}`,
      });
    }

    const hashedPassword = await hashPassword(password);
    const newUser: IUser = new User({
      email,
      password: hashedPassword,
    });

    await newUser.save();

    res.send({ message: 'User created successfully' });
  } catch (error: any) {
    res.send(400).send(error);
  }
};

export const signin = async (
  req: FastifyRequest<{ Body: SignupBody }>,
  res: FastifyReply
): Promise<Response | void> => {
  try {
    const { email, password } = req.body;
    const user: IUser | null = await User.findOne({ email });

    if (!user) {
      res
        .status(401)
        .send({ message: 'Authentication failed. User not found.' });
      return;
    }

    const passwordMatch: boolean = await comparePasswords(
      password,
      user.password
    );

    if (!passwordMatch) {
      res
        .status(401)
        .send({ message: 'Authentication failed. Incorrect password.' });
      return;
    }

    const token: string = getJWToken({ email, id: user._id });
    // TODO use fastify plugin: const token = req.jwt.sign({ email, id: user._id });

    user.last_login = new Date();
    await user.save();

    res.send({ token });
  } catch (error) {
    res.send(error);
  }
};

export const verify = async (req: FastifyRequest, res: FastifyReply) => {
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
      res.status(400).send({ message: 'Wrong verification token' });
    }

    res.status(200).send({ message: 'Account verified successfully' });
  } catch (error) {
    res.status(400).send({ message: 'Error verifying account' });
  }
};

export const forgotPassword = async (
  req: FastifyRequest<{ Body: ForgotPasswordBody }>,
  res: FastifyReply
) => {
  try {
    const { email } = req.body;

    // TODO: Send email with reset password token
    console.log(email);

    res.status(200).send({ message: 'Reset password token sent successfully' });
  } catch (error) {
    res.status(400).send({ message: 'Error sending token' });
  }
};
