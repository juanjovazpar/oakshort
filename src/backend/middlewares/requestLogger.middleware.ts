import { FastifyRequest, FastifyReply, DoneFuncWithErrOrRes } from 'fastify';
import geoip from 'geoip-lite';

async function requestLogger(
  req: FastifyRequest,
  reply: FastifyReply,
  done: DoneFuncWithErrOrRes
) {
  const ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
  const geo = geoip.lookup(ip as string);

  req.requestDetails = {
    ip: ip as string,
    userAgent: req.headers['user-agent'] || '',
    referrer: req.headers['referer'] || req.headers['referrer'] || '',
    geoLocation: geo ? `${geo.city}, ${geo.region}, ${geo.country}` : 'N/A',
    timestamp: new Date(),
    deviceType: /mobile|tablet/i.test(req.headers['user-agent'] || '')
      ? 'Mobile'
      : 'Desktop',
    language: req.headers['accept-language'] || '',
  };

  done();
}

module.exports = requestLogger;
