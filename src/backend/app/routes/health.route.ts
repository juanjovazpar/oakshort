import { FastifyInstance } from 'fastify';
import { METHODS } from '../../../shared/constants/http.methods';
import { ROUTES } from '../../../shared/routes';

export default async function (fastify: FastifyInstance) {
  fastify.route({
    method: METHODS.GET,
    url: ROUTES.HEALTH,
    handler: async () => ({
      message: 'Hey, there. Everything good here!',
    }),
  });
}
