import { FastifyRequest, FastifyReply, DoneFuncWithErrOrRes } from 'fastify';

async function authMiddleware(
  req: FastifyRequest,
  reply: FastifyReply,
  done: DoneFuncWithErrOrRes
) {
  try {
    await req.jwtVerify();
    done();
  } catch (err) {
    reply.send(err);
  }
}

export default authMiddleware;
