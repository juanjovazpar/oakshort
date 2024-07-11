import { FastifyRequest, FastifyReply } from 'fastify';
import { Short } from '../models/short.model';

interface CreateShortUrlBody {
  target: string;
}

export async function createShortUrl(
  req: FastifyRequest<{ Body: CreateShortUrlBody }>,
  res: FastifyReply
) {
  try {
    const { target } = req.body;
    const newShort = new Short({ target });

    await newShort.save();

    return res.send({ message: 'Short created', payload: newShort });
  } catch (error: any) {
    req.log.error(error);
    return res.status(500).send(error);
  }
}

export async function getShorts() {
  const documents = await Short.find({});

  return {
    message: `${documents.length} shorts in the collection`,
    payload: documents,
  };
}

/* export async function redirectToOriginalUrl(
  req: FastifyRequest,
  reply: FastifyReply
) {
  const { shortUrl } = req.params as { shortUrl: string };

  try {
    const urlCollection = await new urlModel(req.server as FastifyInstance);
    const url = await urlCollection.findOne({ shortUrl });

    if (!url) {
      return reply.code(404).send({ message: 'URL not found' });
    }

    await urlCollection.updateOne(
      { shortUrl },
      {
        $inc: { accessCount: 1 },
        $push: { requestLogs: req.requestDetails },
      }
    );

    reply.redirect(url.originalUrl);
  } catch (error) {
    req.log.error(error);
    reply.code(500).send({ message: 'Error redirecting to original URL' });
  }
} */
