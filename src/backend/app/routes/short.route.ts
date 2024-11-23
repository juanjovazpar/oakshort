import { FastifyInstance } from 'fastify';

import { ROUTES } from '../../../shared/routes';
import { updateShort, deleteShort } from '../controllers/short.controller';
import { METHODS } from '../../../shared/constants/http.methods';

async function routes(fastify: FastifyInstance) {
  fastify.route({
    method: METHODS.PATCH,
    url: ROUTES.SHORT,
    handler: updateShort,
  });

  fastify.route({
    method: METHODS.DELETE,
    url: ROUTES.SHORT,
    handler: deleteShort,
  });
}

export default routes;
