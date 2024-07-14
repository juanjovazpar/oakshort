import { FastifyRequest, FastifyReply } from 'fastify';

import { Short } from '../models/short.model';

export const updateShort = async (req: FastifyRequest, res: FastifyReply) => {
  try {
    // @ts-ignore
    const { _id } = req.short;
    // @ts-ignore
    const { target } = req.body;

    const short = await Short.findByIdAndUpdate(
      _id,
      { target },
      { new: true }
    ).select(['-deleted', '-_id']);

    if (!short) {
      res.send({ message: 'Short not found' });
      return;
    }

    res.send({ payload: short });
  } catch (error) {
    res.send(error);
  }
};

export const deleteShort = async (
  req: FastifyRequest,
  res: FastifyReply
): Promise<void> => {
  try {
    // @ts-ignore
    const { _id } = req.short;

    const short = await Short.findByIdAndUpdate(_id, { deleted: true });

    if (!short) {
      res.send({ message: 'Short not found' });
      return;
    }

    res.send({ message: 'Short deleted' });
  } catch (error) {
    res.send(error);
  }
};
