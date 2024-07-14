import { FastifyInstance } from 'fastify';

import { ROUTES } from '../routes';
import { createShort, getShorts } from '../controllers/shorts.controller';

const opts = {
  schema: {
    body: {
      type: 'object',
      required: ['target'],
      properties: {
        target: { type: 'string' },
        expires: { type: 'date' },
      },
    },
  },
};

async function routes(app: FastifyInstance) {
  app.get(ROUTES.SHORTS, { onRequest: [app.authenticate] }, getShorts);
  app.post(ROUTES.SHORTS, createShort);
}

export default routes;
