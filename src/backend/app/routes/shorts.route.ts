import { ROUTES } from '../../../shared/routes';
import { createShort, getShorts } from '../controllers/shorts.controller';
import { METHODS } from '../../../shared/constants/http.methods';

async function routes(fastify: any) {
  fastify.route({
    method: METHODS.GET,
    url: ROUTES.SHORTS,
    handler: getShorts,
  });

  fastify.route({
    method: METHODS.POST,
    url: ROUTES.SHORTS,
    handler: createShort,
  });
}

export default routes;
