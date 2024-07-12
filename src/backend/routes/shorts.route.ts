import { FastifyInstance } from 'fastify';
import { ROUTES } from './routes';
import { createShortUrl, getShorts } from '../controllers/shorts.controller';

const opts = {
  schema: {
    body: {
      type: 'object',
      required: ['target'],
      properties: {
        target: { type: 'string' },
      },
    },
  },
};

async function routes(app: FastifyInstance) {
  app.get(ROUTES.SHORTS, getShorts);

  app.post(ROUTES.SHORTS, opts, createShortUrl);

  app.patch(ROUTES.SHORT, async () => {
    return { hello: 'shorts' };
  });

  app.delete(ROUTES.SHORT, async () => {
    return { hello: 'shorts' };
  });
}

export default routes;
