import Fastify from 'fastify';
import { AddressInfo } from 'net';
import cors from '@fastify/cors';
import dotenv from 'dotenv';
import fastifyEnv from '@fastify/env';
import mongodb from '@fastify/mongodb';
import jwt from '@fastify/jwt';
import bcrypt from 'fastify-bcrypt';

import RedirectRoute from './routes/redirect.route';
import ShortsRoute from './routes/shorts.route';
import requestLogger from './middlewares/requestLogger.middleware';

dotenv.config();

declare module 'fastify' {
  interface FastifyInstance {
    config: {
      PORT: string;
      MONGO_URI: string;
      JWT_SECRET: string;
    };
  }
}

const app = Fastify({
  logger: true,
});

const schema = {
  type: 'object',
  required: ['PORT'],
  properties: {
    PORT: {
      type: 'string',
      default: '3000',
    },
    MONGO_URI: { type: 'string' },
    JWT_SECRET: { type: 'string' },
  },
};
const envOptions = {
  confKey: 'config',
  schema: schema,
  dotenv: true,
  data: process.env,
};

app.register(fastifyEnv, envOptions);
app.register(cors);
app.register(bcrypt, { saltWorkFactor: 12 });
app.register(mongodb, {
  forceClose: true,
  url: process.env.MONGO_URI,
});
app.register(jwt, {
  secret: process.env.JWT_SECRET!,
});

// Middlewares
app.addHook('preHandler', requestLogger);

// Routes
app.register(ShortsRoute);
app.register(RedirectRoute);

const start = async () => {
  try {
    const port = Number(process.env.PORT) || 3000;
    await app.listen({ port });
    const address = app.server.address();
    const portNumber =
      typeof address === 'string' ? address : (address as AddressInfo).port;
    app.log.info(`Server listening on ${portNumber}`);
  } catch (err) {
    app.log.error(err);
    process.exit(1);
  }
};

start();
