import { FastifyInstance, FastifyReply } from 'fastify';
import { PARAMS } from '../../../shared/routes';
import fp from 'fastify-plugin';
import Short from '../models/short.model';
import { CODES } from '../../../shared/constants/http.codes';

export default fp(async function (fastify: FastifyInstance) {
  fastify.decorate(
    'shortOwnership',
    async function (req: any, res: FastifyReply) {
      try {
        const { [PARAMS.SHORTEN_ID]: shorten_id } = req.params as {
          [PARAMS.SHORTEN_ID]: string;
        };
        const fingerprint = req.fingerprint;
        const owner = req.user?.sub;
        const short = await Short.findOne({
          deleted: false,
          short: shorten_id,
          ...(owner ? { owner } : { fingerprint }),
        });

        if (!short) {
          return res
            .status(CODES.NotFound)
            .send({ message: 'Short not found' });
        }

        req.short = short;
      } catch (err) {
        return res.send(err);
      }
    }
  );
});
