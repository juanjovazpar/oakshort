import { FastifyRequest, FastifyReply } from 'fastify';
import { IUser, User } from '../models/user.model';
import {
  hashPassword,
  comparePasswords,
  isValidPassword,
  PASSWORD_RULES,
} from '../utils/password.util';
import { getJWToken } from '../utils/token.util';

interface SignupBody {
  email: string;
  password: string;
}

export const signup = async (
  req: FastifyRequest<{ Body: SignupBody }>,
  res: FastifyReply
): Promise<Response | void> => {
  try {
    const { email, password } = req.body;

    if (!isValidPassword(password)) {
      res.status(400).send({
        message: `This is not a valid password format. ${PASSWORD_RULES}`,
      });
      return;
    }

    const hashedPassword = await hashPassword(password);
    const newUser: IUser = new User({
      email,
      password: hashedPassword,
    });

    await newUser.save();
    // await sendVerificationMail(email, hashedVerificationToken);

    res.status(201).send({ message: 'User created successfully' });
  } catch (error: any) {
    res.send(error);
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

    res.send({ token, userId: user._id, email: user.email });
  } catch (error) {
    res.send(error);
  }
};
