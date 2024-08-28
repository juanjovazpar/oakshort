import Fastify from 'fastify';
import { AddressInfo } from 'net';
import cors from '@fastify/cors';
import dotenv from 'dotenv';
import fastifyEnv from '@fastify/env';
import jwt from '@fastify/jwt';
import bcrypt from 'fastify-bcrypt';
import mongoose from 'mongoose';

import AuthRoute from './routes/auth.route';
import RedirectRoute from './routes/redirect.route';
import ShortsRoute from './routes/shorts.route';
import ShortRoute from './routes/short.route';
import { errorHandler } from './middlewares/error.middleware';
import { requestLogger } from './middlewares/requestLogger.middleware';
import { authMiddleware } from './middlewares/auth.middleware';
import { shortMiddleware } from './middlewares/short.middleware';

dotenv.config();

declare module 'fastify' {
  interface FastifyInstance {
    config: {
      PORT_BE: string;
      DB_URI: string;
      JWT_SECRET: string;
    };
    authenticate: typeof authMiddleware;
    short: typeof shortMiddleware;
  }
}

const app = Fastify({
  logger: true,
});

const schema = {
  type: 'object',
  required: ['PORT_BE'],
  properties: {
    PORT_BE: {
      type: 'string',
      default: '4000',
    },
    DB_URI: { type: 'string' },
    JWT_SECRET: { type: 'string' },
  },
};
const envOptions = {
  confKey: 'config',
  schema: schema,
  dotenv: true,
  data: process.env,
};

mongoose
  .connect(process.env.DB_URI!)
  .then(() => {
    app.log.info('Connected to MongoDB');
  })
  .catch((error) => {
    app.log.info('Error  connecting to MongoDB:', error);
  });

app.register(fastifyEnv, envOptions);
app.register(cors);
app.register(bcrypt, { saltWorkFactor: 12 });
app.register(jwt, {
  secret: process.env.JWT_SECRET!,
});

// Middlewares
app.decorate('authenticate', authMiddleware);
app.decorate('short', shortMiddleware);
// app.addHook('preHandler', requestLogger);
app.setErrorHandler(errorHandler);

// Routes
app.register(AuthRoute);
app.register(ShortsRoute);
app.register(ShortRoute);
app.register(RedirectRoute);

const start = async () => {
  try {
    const port = Number(process.env.PORT_BE) || 3000;
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
