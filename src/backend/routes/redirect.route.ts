import { FastifyInstance } from 'fastify';

import { ROUTES } from './routes';

async function routes(fastify: FastifyInstance) {
  fastify.get('/', async () => {
    return { hello: 'world' };
  });

  fastify.get(ROUTES.REDIRECT, async () => {
    return { hello: 'redirect' };
  });
}

export default routes;
