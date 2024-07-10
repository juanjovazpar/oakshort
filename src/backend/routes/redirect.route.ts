import { FastifyInstance } from 'fastify';

import { ROUTES } from './routes';

async function routes(fastify: FastifyInstance) {
  fastify.get(ROUTES.REDIRECT, async (_, res) => {
    res.redirect('https://www.google.com');
  });
}

export default routes;
