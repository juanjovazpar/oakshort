import { FastifyRequest, FastifyReply, DoneFuncWithErrOrRes } from 'fastify';
import { Short } from '../models/short.model';
import { PARAMS } from '../routes';

export const shortMiddleware = async (
  req: FastifyRequest,
  res: FastifyReply
) => {
  const { shorten_id } = req.params as {
    [PARAMS.SHORTEN_ID]: string;
  };

  try {
    const entity = await Short.findOne({ short: shorten_id });

    if (!entity || entity.deleted) {
      return res.code(404).send({ error: 'Short not found' });
    }

    // @ts-ignore
    req.short = entity;
  } catch (error) {
    res.send(error);
  }
};
