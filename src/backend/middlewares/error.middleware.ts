import { FastifyRequest, FastifyReply } from 'fastify';
import mongoose from 'mongoose';

export const errorHandler = async (
  error: Error,
  _: FastifyRequest,
  res: FastifyReply
) => {
  if (error instanceof mongoose.Error.ValidationError) {
    res.status(400).send({ error: error.message });
  } else {
    res.status(500).send({ error: 'Internal Server Error' });
  }
  console.log(error);
};
