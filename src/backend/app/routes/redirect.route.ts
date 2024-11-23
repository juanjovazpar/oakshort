import { FastifyInstance } from 'fastify';
import { ROUTES } from '../../../shared/routes';

import { redirectShort } from '../controllers/redirect.controller';
import { METHODS } from '../../../shared/constants/http.methods';

async function routes(fastify: FastifyInstance) {
  fastify.route({
    method: METHODS.GET,
    url: ROUTES.REDIRECT,
    handler: redirectShort,
  });

  fastify.route({
    method: METHODS.POST,
    url: ROUTES.REDIRECT,
    handler: redirectShort,
  });
}

export default routes;
