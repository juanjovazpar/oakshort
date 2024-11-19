import { FastifyInstance } from 'fastify';

import {
  signup,
  signin,
  verify,
  forgotPassword,
  resetPassword,
  whoami,
} from '../controllers/auth.controller';
import { ROUTES } from '../../shared/routes';

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
  fastify.get(ROUTES.WHOAMI, whoami);
  fastify.get(ROUTES.VERIFY, verify);
  fastify.post(ROUTES.FORGOT_PASSWORD, forgotPassword);
  fastify.post(ROUTES.RESET_PASSWORD, resetPassword);
  fastify.post(ROUTES.SIGNUP, opts, signup);
  fastify.post(ROUTES.SIGNIN, opts, signin);
}

export default routes;
