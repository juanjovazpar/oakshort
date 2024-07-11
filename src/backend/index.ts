import Fastify from 'fastify';
import { AddressInfo } from 'net';
import cors from '@fastify/cors';
import dotenv from 'dotenv';
import fastifyEnv from '@fastify/env';
import jwt from '@fastify/jwt';
import bcrypt from 'fastify-bcrypt';

import AuthRoute from './routes/auth.route';
import RedirectRoute from './routes/redirect.route';
import ShortsRoute from './routes/shorts.route';
import requestLogger from './middlewares/requestLogger.middleware';
import mongoose from 'mongoose';

dotenv.config();

declare module 'fastify' {
  interface FastifyInstance {
    config: {
      PORT: string;
      DB_URI: string;
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
  .connect(process.env.DB_URI!, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  } as mongoose.ConnectOptions)
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((error) => {
    console.error('Error  connecting to MongoDB:', error);
  });

app.register(fastifyEnv, envOptions);
app.register(cors);
app.register(bcrypt, { saltWorkFactor: 12 });
app.register(jwt, {
  secret: process.env.JWT_SECRET!,
});

// Middlewares
app.addHook('preHandler', requestLogger);

// Routes
app.register(AuthRoute);
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
