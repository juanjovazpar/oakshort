import { FastifyInstance } from 'fastify';
import {
  createShortUrl,
  redirectToOriginalUrl,
} from '../controllers/urlController';
import authMiddleware from '../auth/authMiddleware';

async function urlRoutes(fastify: FastifyInstance) {
  fastify.post('/shorten', { preHandler: authMiddleware }, createShortUrl);
  fastify.get('/:shortUrl', redirectToOriginalUrl);
}

module.exports = urlRoutes;
