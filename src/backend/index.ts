import Fastify from 'fastify';
import dotenv from 'dotenv';
import { AddressInfo } from 'net';
import cors from '@fastify/cors';
import env from '@fastify/env';
import mongodb from '@fastify/mongodb';
import jwt from '@fastify/jwt';
import bcrypt from 'fastify-bcrypt';

import RedirectRoute from './routes/redirect.route';
import ShortsRoute from './routes/shorts.route';
import requestLogger from './middlewares/requestLogger.middleware';
// import DBConnector from './utils/db-connector.util';

dotenv.config();

const app = Fastify({
  logger: true,
});

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

app.register(cors);
app.register(env, {
  schema: {
    type: 'object',
    required: ['PORT', 'MONGO_URI', 'JWT_SECRET'],
    properties: {
      PORT: { type: 'string', default: '3000' },
      MONGO_URI: { type: 'string' },
      JWT_SECRET: { type: 'string' },
    },
  },
  dotenv: true,
});
/* app.register(mongodb, {
  forceClose: true,
  url: process.env.MONGO_URI!,
}); */
app.register(jwt, {
  secret: process.env.JWT_SECRET!,
});
app.register(bcrypt, { saltWorkFactor: 12 });

//fastify.register(DBConnector);
app.register(ShortsRoute);
app.register(RedirectRoute);

app.addHook('preHandler', requestLogger);
