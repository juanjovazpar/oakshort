import { FastifyRequest, FastifyReply } from 'fastify';
import { ObjectId } from 'mongodb';
import userModel from '../models/userModel';

interface RegisterBody {
  username: string;
  password: string;
}

interface LoginBody {
  username: string;
  password: string;
}

export async function register(
  req: FastifyRequest<{ Body: RegisterBody }>,
  reply: FastifyReply
) {
  const { username, password } = req.body;

  try {
    const userCollection = await userModel(req.fastify);
    const hashedPassword = await req.fastify.bcrypt.hash(password);
    await userCollection.insertOne({ username, password: hashedPassword });
    reply.code(201).send({ message: 'User registered successfully' });
  } catch (error) {
    req.fastify.log.error(error);
    reply.code(500).send({ message: 'Error registering user' });
  }
}

export async function login(
  req: FastifyRequest<{ Body: LoginBody }>,
  reply: FastifyReply
) {
  const { username, password } = req.body;

  try {
    const userCollection = await userModel(req.fastify);
    const user = await userCollection.findOne({ username });

    if (!user || !(await req.fastify.bcrypt.compare(password, user.password))) {
      return reply.code(401).send({ message: 'Invalid credentials' });
    }

    const token = req.fastify.jwt.sign(
      { userId: user._id.toString() },
      { expiresIn: '1h' }
    );
    reply.send({ token });
  } catch (error) {
    req.fastify.log.error(error);
    reply.code(500).send({ message: 'Error logging in' });
  }
}
