import { FastifyInstance } from 'fastify';
import AutoLoad from '@fastify/autoload';
import * as path from 'path';

/* eslint-disable-next-line */
export interface AppOptions {}

export async function app(fastify: FastifyInstance, opts: AppOptions) {
  // TODO: Use fastify.env to set environment variables
  // This loads all plugins defined in plugins folder
  // define your plugins in one of these
  fastify.register(AutoLoad, {
    dir: path.join(__dirname, 'plugins'),
    options: { ...opts },
  });

  // This loads all routes defined in routes folder
  // define your routes in one of these
  fastify.register(AutoLoad, {
    dir: path.join(__dirname, 'routes'),
    options: { ...opts },
  });
}
