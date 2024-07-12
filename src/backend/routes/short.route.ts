import { FastifyInstance } from 'fastify';
import { ROUTES } from '../routes';
import { updateShort, deleteShort } from '../controllers/short.controller';
import { getShortById } from '../middlewares/short.middleware';

async function routes(app: FastifyInstance) {
  app.patch(ROUTES.SHORT, { preHandler: getShortById }, updateShort);
  app.delete(ROUTES.SHORT, deleteShort);
}

export default routes;
