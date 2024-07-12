import { FastifyInstance, FastifyReply, FastifyRequest } from 'fastify';
import { Short } from '../models/short.model';
import { ROUTES, PARAMS } from './routes';

async function routes(fastify: FastifyInstance) {
  fastify.get(
    ROUTES.REDIRECT,
    async (request: FastifyRequest, reply: FastifyReply) => {
      try {
        const { shorten_id } = request.params as {
          [PARAMS.SHORTEN_ID]: string;
        };

        const short = await Short.findByIdAndUpdate(
          { short: shorten_id },
          { $inc: { accessCount: 1, lastRead: Date.now() } },
          { new: true }
        );

        if (!short || !short.target || !short.active || short.deleted) {
          return reply.status(404).send({ message: 'Invalid short' });
        }

        reply.redirect(short.target);
      } catch (error: any) {
        return reply.status(500).send(error);
      }
    }
  );
}

export default routes;
