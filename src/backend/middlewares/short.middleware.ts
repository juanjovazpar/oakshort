import { FastifyRequest, FastifyReply, DoneFuncWithErrOrRes } from 'fastify';
import { Short } from '../models/short.model';
import { PARAMS } from '../routes';

export const getShortById = async (
  req: FastifyRequest,
  res: FastifyReply,
  done: DoneFuncWithErrOrRes
) => {
  const id = req.params[PARAMS.SHORTEN_ID];

  try {
    const entity = await Short.findOne({ _id: id });
    if (!entity) {
      return res.code(404).send({ error: 'Entity not found' });
    }

    req.short = entity;
    done();
  } catch (error) {
    res.send(error);
  }
};
