import { FastifyInstance } from 'fastify';
import fp from 'fastify-plugin';
import mongoose from 'mongoose';

export default fp(async function (fastify: FastifyInstance) {
  mongoose
    .connect(process.env.DB_AUTH_HOST || 'mongodb://localhost:27017/oakshort')
    .then(() => {
      fastify.log.info('Connected to MongoDB');
    })
    .catch((error) => {
      fastify.log.info('Error connecting to MongoDB:', error);
    });
});
