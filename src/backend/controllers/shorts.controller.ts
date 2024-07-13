import { FastifyRequest, FastifyReply } from 'fastify';

import { Short } from '../models/short.model';

interface CreateShortBody {
  target: string;
}

export const getShorts = async (req: FastifyRequest, res: FastifyReply) => {
  try {
    const documents = await Short.find({});

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
    const newShort = new Short({ target });

    await newShort.save();

    res.send({ payload: newShort });
  } catch (error: any) {
    res.send(error);
  }
};
