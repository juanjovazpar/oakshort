import { FastifyInstance } from 'fastify';
import fp from 'fastify-plugin';
import cors from '@fastify/cors';

export default fp(async function (fastify: FastifyInstance) {
  // TODO: Add CORS configuration by environment to prevent security issues in production
  await fastify.register(cors, { origin: '*' });
});
