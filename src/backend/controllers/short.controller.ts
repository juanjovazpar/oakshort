import { FastifyRequest, FastifyReply } from 'fastify';

import { Short } from '../models/short.model';

export const updateShort = async (
  req: FastifyRequest<{ Body: any }>,
  res: FastifyReply
) => {
  try {
    const { _id } = (req as RequestProduct).product;
    const { name, description } = req.body;

    const short = await Short.findByIdAndUpdate(
      _id,
      { name, description },
      { new: true }
    );

    if (!short) {
      res.send({ message: 'Short not found' });
      return;
    }

    res.send(short);
  } catch (error) {
    res.send(error);
  }
};

export const deleteShort = async (
  req: FastifyRequest<{ Body: any }>,
  res: FastifyReply
): Promise<void> => {
  try {
    const { _id } = (req as RequestProduct).product;
    const short = await Short.findByIdAndDelete(_id);

    if (!short) {
      res.send({ message: 'Short not found' });
      return;
    }

    res.send(short);
  } catch (error) {
    res.send(error);
  }
};
