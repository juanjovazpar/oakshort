import Fastify from 'fastify';
import dotenv from 'dotenv';

import URLRoute from './routes/url.route';
// import DBConnector from './utils/db-connector.util';

dotenv.config();

const fastify = Fastify({
  logger: true,
});

//fastify.register(DBConnector);
fastify.register(URLRoute);

const start = async () => {
  try {
    const port = Number(process.env.PORT) || 3000;
    await fastify.listen({ port });
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
};

start();
