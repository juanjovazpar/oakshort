import { FastifyInstance } from 'fastify';
import { ROUTES } from '../routes';

import { redirectShort } from '../controllers/redirect.controller';

async function routes(fastify: FastifyInstance) {
  fastify.get(ROUTES.REDIRECT, redirectShort);
}

export default routes;
