import { FastifyInstance } from 'fastify';
import {
  register,
  signin,
  verify,
  forgotPassword,
  resetPassword,
  whoami,
} from '../controllers/auth.controller';
import { ROUTES } from '../../../shared/routes';
import { METHODS } from '../../../shared/constants/http.methods';

async function routes(fastify: any) {
  fastify.route({
    method: METHODS.POST,
    url: ROUTES.REGISTER,
    handler: register,
  });

  fastify.route({
    method: METHODS.POST,
    url: ROUTES.SIGNIN,
    handler: signin,
  });

  fastify.route({
    method: METHODS.GET,
    url: ROUTES.VERIFY,
    handler: verify,
  });

  fastify.route({
    method: METHODS.POST,
    url: ROUTES.FORGOT_PASSWORD,
    handler: forgotPassword,
  });

  fastify.route({
    method: METHODS.POST,
    url: ROUTES.RESET_PASSWORD,
    handler: resetPassword,
  });

  fastify.route({
    method: METHODS.GET,
    url: ROUTES.WHOAMI,
    onRequest: fastify['authenticate'],
    handler: whoami,
  });
}

export default routes;
