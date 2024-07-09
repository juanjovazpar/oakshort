import { FastifyRequest, FastifyReply } from 'fastify';
import { ObjectId } from 'mongodb';
import urlModel from '../models/urlModel';
import shortIdGenerator from '../utils/shortIdGenerator';

interface CreateShortUrlBody {
  originalUrl: string;
}

export async function createShortUrl(
  req: FastifyRequest<{ Body: CreateShortUrlBody }>,
  reply: FastifyReply
) {
  const { originalUrl } = req.body;
  const shortUrl = shortIdGenerator();

  try {
    const urlCollection = await urlModel(req.fastify);
    await urlCollection.insertOne({
      originalUrl,
      shortUrl,
      accessCount: 0,
      requestLogs: [],
    });
    reply.code(201).send({ originalUrl, shortUrl });
  } catch (error) {
    req.fastify.log.error(error);
    reply.code(500).send({ message: 'Error creating short URL' });
  }
}

export async function redirectToOriginalUrl(
  req: FastifyRequest,
  reply: FastifyReply
) {
  const { shortUrl } = req.params as { shortUrl: string };

  try {
    const urlCollection = await urlModel(req.fastify);
    const url = await urlCollection.findOne({ shortUrl });

    if (!url) {
      return reply.code(404).send({ message: 'URL not found' });
    }

    // Update access count and log request details
    await urlCollection.updateOne(
      { shortUrl },
      {
        $inc: { accessCount: 1 },
        $push: { requestLogs: req.requestDetails },
      }
    );

    reply.redirect(url.originalUrl);
  } catch (error) {
    req.fastify.log.error(error);
    reply.code(500).send({ message: 'Error redirecting to original URL' });
  }
}
