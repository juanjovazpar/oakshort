import { FastifyInstance } from 'fastify';
import { ROUTES } from './routes';
import { createShortUrl, getShorts } from '../controllers/shorts.controller';

async function routes(app: FastifyInstance) {
  type ShortBody = {
    Body: {
      target: string;
    };
  };

  const shortBodyJsonSchema = {
    type: 'object',
    required: ['target'],
    properties: {
      target: { type: 'string' },
    },
  };

  const schema = {
    body: shortBodyJsonSchema,
  };

  app.get(ROUTES.SHORTS, getShorts);

  app.post<ShortBody>(ROUTES.SHORTS, { schema }, createShortUrl);

  app.patch<ShortBody>(ROUTES.SHORT, async () => {
    return { hello: 'shorts' };
  });

  app.delete(ROUTES.SHORT, async () => {
    return { hello: 'shorts' };
  });
}

export default routes;
