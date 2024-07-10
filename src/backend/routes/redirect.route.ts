import { FastifyInstance, FastifyReply, FastifyRequest } from 'fastify';
import { IShort, Short } from '../models/short.model';
import { ROUTES, PARAMS } from './routes';

async function routes(fastify: FastifyInstance) {
  fastify.get(
    ROUTES.REDIRECT,
    async (request: FastifyRequest, reply: FastifyReply) => {
      try {
        const { shorten_id } = request.params as {
          [PARAMS.SHORTEN_ID]: string;
        };

        const { target } = (await Short.findByIdAndUpdate(
          { short: shorten_id },
          { $inc: { accessCount: 1 } },
          { new: true }
        )) as IShort;

        reply.redirect(target);
      } catch (error: any) {
        return reply.status(500).send(error);
      }
    }
  );
}

export default routes;
