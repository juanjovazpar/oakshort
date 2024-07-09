import { FastifyInstance } from 'fastify';

import {
  createShortUrl,
  redirectToOriginalUrl,
} from 'backend/controllers/url.controller';
import authMiddleware from 'backend/middlewares/auth.middleware';

async function routes(fastify: FastifyInstance) {
  fastify.post('/shorten', { preHandler: authMiddleware }, createShortUrl);
  fastify.get('/:shortUrl', redirectToOriginalUrl);
}

/* async function routes(fastify: FastifyInstance) {
  if (!fastify.mongo || !fastify.mongo.db) {
    throw new Error('MongoDB plugin not registered');
  }

  const collection = fastify.mongo.db.collection('test_collection'); 

  fastify.get('/', async () => {
    return { hello: 'world' };
  });

  fastify.get('/animals', async () => {
    const result = await collection.find().toArray();
    if (result.length === 0) {
      throw new Error('No documents found');
    }
    return result;
  });

  type AnimalParams = {
    Params: {
      animal: string;
    };
  };

  fastify.get<AnimalParams>('/animals/:animal', async (request) => {
    const result = await collection.findOne({ animal: request.params.animal });
    if (!result) {
      throw new Error('Invalid value');
    }
    return result;
  });

  const animalBodyJsonSchema = {
    type: 'object',
    required: ['animal'],
    properties: {
      animal: { type: 'string' },
    },
  };

  const schema = {
    body: animalBodyJsonSchema,
  };

  type AnimalBody = {
    Body: {
      animal: string;
    };
  };

  fastify.post<AnimalBody>('/animals', { schema }, async (request) => {
    const result = await collection.insertOne({ animal: request.body.animal });
    return result;
  }); 
}*/

export default routes;
