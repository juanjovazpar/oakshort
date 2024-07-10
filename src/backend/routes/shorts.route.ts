import { FastifyInstance, FastifyReply, FastifyRequest } from 'fastify';
import { ROUTES } from './routes';
import { Short } from '../models/short.model';

async function routes(app: FastifyInstance) {
  if (!app.mongo || !app.mongo.db) {
    throw new Error('MongoDB plugin not registered');
  }

  const collection = app.mongo.db?.collection('shorts');

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

  app.get(ROUTES.SHORTS, async () => {
    const documents = await collection.find({}).toArray();

    return {
      message: `${documents.length} shorts in the collection`,
      payload: documents,
    };
  });

  app.post<ShortBody>(
    ROUTES.SHORTS,
    { schema },
    async (request: FastifyRequest<ShortBody>, reply: FastifyReply) => {
      try {
        const { target } = request.body;
        const newShort = new Short({ target });

        await newShort.save();

        return reply.send({ message: 'Short created', payload: newShort });
      } catch (error: any) {
        if (error.code === 11000) {
          return reply
            .status(400)
            .send({ error: 'Short ID already exists. Please try again.' });
        }
        return reply.status(500).send(error);
      }
    }
  );

  app.patch(ROUTES.SHORTS, async () => {
    return { hello: 'shorts' };
  });

  app.delete(ROUTES.SHORTS, async () => {
    return { hello: 'shorts' };
  });
}

export default routes;
