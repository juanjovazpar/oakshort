import { FastifyRequest, FastifyReply } from 'fastify';

import { Short } from '../models/short.model';
import { PARAMS } from '../routes';
import { isFutureDate, isPastDate } from '../utils/dates.utils';

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

    if (short.expires && isPastDate(short.expires)) {
      // TODO: Redirect to expired shorts page
      // TODO: Notify creator if someone try to access an expired short
      res.status(410).send({ message: `Short expired at ${short.expires}` });
      return;
    }

    if (short.activation && isFutureDate(short.activation)) {
      // TODO: Redirect to non-active shorts page
      res
        .status(410)
        .send({ message: `Short will be active at ${short.activation}` });
      return;
    }

    if (short.password) {
      // TODO: Redirect to protected shorts
      res
        .status(410)
        .send({ message: 'This short is protected with a password' });
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
