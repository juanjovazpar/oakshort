import { FastifyRequest, FastifyReply } from 'fastify';
import { Short } from '../models/short.model';
import { PARAMS } from '../../backend/routes';

export const redirectShort = async (req: FastifyRequest, res: FastifyReply) => {
  try {
    const { shorten_id } = req.params as {
      [PARAMS.SHORTEN_ID]: string;
    };

    const short = await Short.findByIdAndUpdate(
      { short: shorten_id },
      { $inc: { accessCount: 1, lastRead: Date.now() } },
      { new: true }
    );

    if (!short || !short.target || !short.active || short.deleted) {
      return res.status(404).send({ message: 'Invalid short' });
    }

    res.redirect(short.target);
  } catch (error: any) {
    res.send(error);
  }
};

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
  _: FastifyRequest<{ Body: any }>,
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
