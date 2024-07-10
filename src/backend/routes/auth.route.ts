import { FastifyInstance } from 'fastify';
import { register, login } from '../controllers/auth.controller';

import { ROUTES } from './routes';

async function routes(fastify: FastifyInstance) {
  fastify.post(ROUTES.SIGNUP, register);
  fastify.post(ROUTES.SIGNIN, login);
}

export default routes;
