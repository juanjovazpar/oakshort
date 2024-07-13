import { FastifyRequest, FastifyReply } from 'fastify';
import { MongoServerError } from 'mongodb';
import mongoose from 'mongoose';

export const errorHandler = async (
  error: Error,
  _: FastifyRequest,
  res: FastifyReply
) => {
  if (
    error instanceof mongoose.Error.ValidationError ||
    (error as MongoServerError).code === 11000
  ) {
    res.status(400).send({ error: error.message });
  } // @ts-ignore
  else if (error.statusCode === 401) {
    res.status(401).send({ error: error.message });
  } else {
    res.status(500).send({ error: 'Internal Server Error' });
  }
  console.log(error);
};
