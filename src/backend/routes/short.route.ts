import { FastifyInstance } from 'fastify';

import { ROUTES } from '../routes';
import { updateShort, deleteShort } from '../controllers/short.controller';

async function routes(app: FastifyInstance) {
  app.patch(ROUTES.SHORT, updateShort);
  app.delete(ROUTES.SHORT, deleteShort);
}

export default routes;
