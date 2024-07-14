import { FastifyRequest, FastifyReply } from 'fastify';

import { IShort, Short } from '../models/short.model';

interface CreateShortBody {
  short: string;
  target: string;
  expires: string;
  activation: string;
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
    const { short, target, expires, activation } = req.body;
    let newshort = new Short({ short, target, expires, activation });

    await newshort.save();

    newshort = newshort.toObject();
    delete newshort.deleted;
    delete newshort._id;

    res.send({ payload: newshort });
  } catch (error: any) {
    res.send(error);
  }
};
