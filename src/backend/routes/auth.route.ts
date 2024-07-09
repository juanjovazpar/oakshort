import { FastifyInstance } from 'fastify';
import { register, login } from '../controllers/auth.controller';

async function routes(fastify: FastifyInstance) {
  fastify.post('/register', register);
  fastify.post('/login', login);
}

module.exports = routes;
