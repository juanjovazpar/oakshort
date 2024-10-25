import { FastifyRequest, FastifyReply, DoneFuncWithErrOrRes } from 'fastify';
import geoip from 'geoip-lite';

interface RequestDetails {
  ip: string;
  userAgent: string;
  referrer: string;
  geoLocation: string;
  timestamp: Date;
  deviceType: string;
  language: string;
}

export const requestLogger = async (
  req: FastifyRequest,
  _: FastifyReply,
  done: DoneFuncWithErrOrRes
) => {
  const ip = req.headers['x-forwarded-for'] || req.ip;
  const geo = geoip.lookup(ip as string);
  const referrer = Array.isArray(req.headers['referer'])
    ? req.headers['referer'][0]
    : req.headers['referer'] || req.headers['referrer'] || '';

  const requestDetails: RequestDetails = {
    ip: ip as string,
    userAgent: req.headers['user-agent'] || '',
    referrer: referrer as string,
    geoLocation: geo ? `${geo.city}, ${geo.region}, ${geo.country}` : 'N/A',
    timestamp: new Date(),
    deviceType: /mobile|tablet/i.test(req.headers['user-agent'] || '')
      ? 'Mobile'
      : 'Desktop',
    language: req.headers['accept-language'] || '',
  };

  (req as any).requestDetails = requestDetails;

  // TODO: Store calls
  // console.log('RequestDetails:', requestDetails);
  done();
};
