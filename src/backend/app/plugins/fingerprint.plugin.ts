import { FastifyInstance } from 'fastify';
import fp from 'fastify-plugin';

export default fp(async function (fastify: FastifyInstance) {
  fastify.addHook('onRequest', async (request: any) => {
    const fingerprint = request.headers['fingerprint'];

    if (fingerprint) {
      request.fingerprint = fingerprint;
    }
  });
});
