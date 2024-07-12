import { FastifyRequest, FastifyReply, DoneFuncWithErrOrRes } from 'fastify';

export const authMiddleware = async (
  req: FastifyRequest,
  reply: FastifyReply,
  done: DoneFuncWithErrOrRes
) => {
  try {
    await req.jwtVerify();
    done();
  } catch (err) {
    reply.send(err);
  }
};
