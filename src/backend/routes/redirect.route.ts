import { FastifyInstance } from 'fastify';
import { ROUTES } from '../routes';

import { redirectShort } from '../controllers/redirect.controller';
const opts = {
  schema: {
    body: {
      type: 'object',
      required: ['password'],
      properties: {
        password: { type: 'string' },
      },
    },
  },
};
async function routes(fastify: FastifyInstance) {
  fastify.get(ROUTES.REDIRECT, redirectShort);
  fastify.post(ROUTES.REDIRECT, opts, redirectShort);
}

export default routes;
