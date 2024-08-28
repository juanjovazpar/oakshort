import { FastifyInstance } from 'fastify';

import { ROUTES } from '../../shared/routes';
import { createShort, getShorts } from '../controllers/shorts.controller';

async function routes(app: FastifyInstance) {
  app.get(ROUTES.SHORTS, { onRequest: [app.authenticate] }, getShorts);
  app.post(ROUTES.SHORTS, createShort);
}

export default routes;
