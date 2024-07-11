import { FastifyRequest, FastifyReply } from 'fastify';
import { IUser, User } from '../models/user.model';
import { isValidEmail } from '../utils/isValidEmail.util';
import {
  isValidPassword,
  PASSWORD_RULES,
  hashPassword,
  comparePasswords,
} from '../utils/password.util';
import { getHashedToken, getJWToken } from '../utils/token.util';

interface SignupBody {
  email: string;
  password: string;
}

type ShortBody = {
  Body: {
    target: string;
  };
};

const shortBodyJsonSchema = {
  type: 'object',
  required: ['email', 'password'],
  properties: {
    email: { type: 'string' },
    password: { type: 'string' },
  },
};

const schema = {
  body: shortBodyJsonSchema,
};

export const signup = async (
  req: FastifyRequest<{ Body: SignupBody }>,
  res: FastifyReply
): Promise<Response | void> => {
  try {
    const { email, password } = req.body;
    const existingUser: IUser | null = await User.findOne({ email });

    if (existingUser) {
      res.status(400).send({ message: 'Email already exists' });
      return;
    }

    if (!isValidEmail(email)) {
      res.status(400).send({ message: 'Invalid email format' });
      return;
    }

    if (!isValidPassword(password)) {
      res
        .status(400)
        .send({ message: `Invalid password format. ${PASSWORD_RULES}` });
      return;
    }

    const hashedPassword = await hashPassword(password);
    const hashedVerificationToken = await getHashedToken();
    const newUser: IUser = new User({
      email,
      password: hashedPassword,
      verificationToken: hashedVerificationToken,
    });

    await newUser.save();
    // await sendVerificationMail(email, hashedVerificationToken);

    res.status(201).send({ message: 'User created successfully' });
  } catch (error) {
    req.log.error(error);
    res.status(500).send({ message: 'Error creating user', error });
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
    const token: string = getJWToken('user', user.email);

    user.last_login = new Date();
    await user.save();

    res.status(200).send({ token, userId: user._id, email: user.email });
  } catch (error) {
    req.log.error(error);
    res.status(500).send({ message: 'Error during login', error });
  }
};
