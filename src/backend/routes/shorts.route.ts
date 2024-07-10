import { FastifyInstance } from 'fastify';

import { ROUTES } from './routes';
import getShort from '../utils/shortGenerator.util';

async function routes(fastify: FastifyInstance) {
  if (!fastify.mongo || !fastify.mongo.db) {
    throw new Error('MongoDB plugin not registered');
  }

  const collection = fastify.mongo.db.collection('shorts');

  type ShortBody = {
    Body: {
      url: string;
    };
  };

  const shortBodyJsonSchema = {
    type: 'object',
    required: ['url'],
    properties: {
      url: { type: 'string' },
    },
  };

  const schema = {
    body: shortBodyJsonSchema,
  };

  fastify.get(ROUTES.SHORTS, async () => {
    const payload = await collection.find().toArray();

    return {
      msg:
        payload.length === 0
          ? 'No shorts found'
          : `${payload.length} shorts found`,
      payload,
    };
  });

  fastify.post<ShortBody>(ROUTES.SHORTS, { schema }, async (request) => {
    const payload = await collection.insertOne({
      target: request.body.url,
      short: getShort(),
    });

    return { msg: 'Short created', payload };
  });

  fastify.patch(ROUTES.SHORTS, async () => {
    return { hello: 'shorts' };
  });

  fastify.delete(ROUTES.SHORTS, async () => {
    return { hello: 'shorts' };
  });
}

export default routes;
