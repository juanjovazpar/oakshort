import { FastifyRequest, FastifyReply } from 'fastify';

export const authMiddleware = async (
  req: FastifyRequest,
  res: FastifyReply
) => {
  try {
    await req.jwtVerify();
  } catch (err) {
    res.send(err);
  }
};
