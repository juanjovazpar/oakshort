import { ROUTES } from '../../../shared/routes';
import {
  updateShort,
  deleteShort,
  getShort,
} from '../controllers/short.controller';
import { METHODS } from '../../../shared/constants/http.methods';

async function routes(fastify: any) {
  fastify.route({
    method: METHODS.GET,
    url: ROUTES.SHORT,
    onRequest: fastify['shortOwnership'],
    handler: getShort,
  });

  fastify.route({
    method: METHODS.PATCH,
    url: ROUTES.SHORT,
    onRequest: fastify['shortOwnership'],
    handler: updateShort,
  });

  fastify.route({
    method: METHODS.DELETE,
    url: ROUTES.SHORT,
    onRequest: fastify['shortOwnership'],
    handler: deleteShort,
  });
}

export default routes;
