import { FastifyInstance } from 'fastify';

import { signup, signin } from '../controllers/auth.controller';
import { ROUTES } from '../../routes';

const opts = {
  schema: {
    body: {
      type: 'object',
      required: ['email', 'password'],
      properties: {
        email: { type: 'string' },
        password: { type: 'string' },
      },
    },
  },
};

async function routes(fastify: FastifyInstance) {
  // fastify.get(ROUTES.VERIFY, verify);
  fastify.post(ROUTES.SIGNUP, opts, signup);
  fastify.post(ROUTES.SIGNIN, opts, signin);
}

export default routes;
