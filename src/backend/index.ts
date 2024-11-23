import Fastify from 'fastify';
import { app } from './app';

const host = process.env.HOST ?? '0.0.0.0';
const port = process.env.API_AUTH_PORT
  ? Number(process.env.API_AUTH_PORT)
  : 3000;

const server = Fastify({
  logger: true,
});

server.register(app);

server.listen({ port, host }, (err) => {
  if (err) {
    server.log.error(err);
    process.exit(1);
  } else {
    console.log(`[ ready ] http://${host}:${port}`);
  }
});
