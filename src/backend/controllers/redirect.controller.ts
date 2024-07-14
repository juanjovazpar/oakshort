import { FastifyRequest, FastifyReply } from 'fastify';

import { Short } from '../models/short.model';
import { PARAMS } from '../routes';

export const redirectShort = async (req: FastifyRequest, res: FastifyReply) => {
  try {
    const { shorten_id } = req.params as {
      [PARAMS.SHORTEN_ID]: string;
    };

    const short = await Short.findOne({ short: shorten_id });

    if (!short || !short.target || !short.active || short.deleted) {
      res.status(404).send({ message: 'Invalid short' });
      return;
    }

    if (short.expires && new Date(short.expires) < new Date()) {
      // TODO: Redirect to expired shorts page
      res.status(410).send({ message: 'Short URL has expired' });
      return;
    }

    short.accessCount += 1;
    short.lastRead = new Date();
    await short.save();

    res.redirect(short.target);
  } catch (error: any) {
    res.send(error);
  }
};
