import { FastifyRequest, FastifyReply } from 'fastify';
import { Short } from '../models/short.model';
import { PARAMS } from '../routes';

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
      res.status(404).send({ message: 'Invalid short' });
      return;
    }

    res.redirect(short.target);
  } catch (error: any) {
    res.send(error);
  }
};
