import { FastifyRequest, FastifyReply } from 'fastify';

import { Short } from '../models/short.model';
import { hashPassword } from '../utils/password.util';

interface CreateShortBody {
  short: string;
  target: string;
  expires: string;
  activation: string;
  password: string;
  accessLimit: number;
}

export const getShorts = async (_: FastifyRequest, res: FastifyReply) => {
  try {
    const documents = await Short.find({ deleted: false }).select([
      '-deleted',
      '-_id',
    ]);

    res.send({
      payload: documents,
    });
  } catch (error: any) {
    res.send(error);
  }
};

export const createShort = async (
  req: FastifyRequest<{ Body: CreateShortBody }>,
  res: FastifyReply
) => {
  try {
    const { short, target, expires, activation, accessLimit } = req.body;
    let { password } = req.body;

    if (password) {
      password = await hashPassword(password);
    }

    let newshort = new Short({
      short,
      target,
      expires,
      activation,
      accessLimit,
      password,
    });

    await newshort.save();

    newshort = newshort.toObject();
    delete newshort.deleted;
    delete newshort._id;
    delete newshort.password;

    res.send({ payload: newshort });
  } catch (error: any) {
    res.send(error);
  }
};
