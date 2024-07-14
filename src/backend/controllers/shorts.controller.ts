import { FastifyRequest, FastifyReply } from 'fastify';

import { IShort, Short } from '../models/short.model';

interface CreateShortBody {
  target: string;
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
    const { target } = req.body;
    let newShort = new Short({ target });

    await newShort.save();

    newShort = newShort.toObject();
    delete newShort.deleted;
    delete newShort._id;

    res.send({ payload: newShort });
  } catch (error: any) {
    res.send(error);
  }
};
