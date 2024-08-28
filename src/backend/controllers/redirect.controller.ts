import { FastifyRequest, FastifyReply } from 'fastify';

import { Short } from '../../shared/models/short.model';
import { PARAMS } from '../../shared/routes';
import { isFutureDate, isPastDate } from '../../shared/utils/dates.utils';
import { comparePasswords } from '../../shared/utils/password.util';

interface RedirectShortBody {
  password: string;
}

export const redirectShort = async (
  req: FastifyRequest<{ Body: RedirectShortBody }>,
  res: FastifyReply
) => {
  try {
    const { shorten_id } = req.params as {
      [PARAMS.SHORTEN_ID]: string;
    };
    const password: string = req.body?.password;
    const short = await Short.findOne({ short: shorten_id });

    if (!short || !short.target || !short.active || short.deleted) {
      res.status(404).send({ message: 'Invalid short' });
      return;
    }

    if (short.password) {
      const passwordMatch: boolean = await (password
        ? comparePasswords(password, short.password)
        : false);

      if (!passwordMatch) {
        // TODO: Redirect to protected shorts and manage wrong password
        res
          .status(410)
          .send({ message: 'This short is protected with a password' });
        return;
      }
    }

    if (short.expires && isPastDate(short.expires)) {
      // TODO: Redirect to expired shorts page
      // TODO: Notify creator if someone try to access an expired short
      res.status(410).send({ message: `Short expired at ${short.expires}` });
      return;
    }

    if (short.accessLimit && short.accessCount >= short.accessLimit) {
      short.accessAttendsOverLimit += 1;
      await short.save();
      // TODO: Notify creator if someone reach the access limit
      res.status(410).send({
        message: `This short is limited to ${short.accessLimit} access`,
      });
      return;
    }

    if (short.activation && isFutureDate(short.activation)) {
      // TODO: Redirect to non-active shorts page
      res
        .status(410)
        .send({ message: `Short will be active at ${short.activation}` });
      return;
    }

    short.accessCount += 1;
    short.lastRead = new Date();
    await short.save();

    res.redirect(short.target);
  } catch (error: any) {
    res.send(error);
  }
};
