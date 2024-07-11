import { FastifyInstance } from 'fastify';
import { signup, signin } from '../controllers/auth.controller';

import { ROUTES } from './routes';

async function routes(fastify: FastifyInstance) {
  fastify.post(ROUTES.SIGNUP, signup);
  fastify.post(ROUTES.SIGNIN, signin);
}

export default routes;
