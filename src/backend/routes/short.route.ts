import { FastifyInstance } from 'fastify';

import { ROUTES } from '../../routes';
import { updateShort, deleteShort } from '../controllers/short.controller';

async function routes(app: FastifyInstance) {
  app.patch(
    ROUTES.SHORT,
    { onRequest: [app.authenticate, app.short] },
    updateShort
  );
  app.delete(
    ROUTES.SHORT,
    { onRequest: [app.authenticate, app.short] },
    deleteShort
  );
}

export default routes;
