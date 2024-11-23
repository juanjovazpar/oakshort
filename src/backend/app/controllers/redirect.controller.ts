import { FastifyRequest, FastifyReply } from 'fastify';

import Short from '../models/short.model';
import { PARAMS } from '../../../shared/routes';
import { isFutureDate, isPastDate } from '../../../shared/utils/dates.utils';
import { comparePasswords } from '../../../shared/utils/password.util';
import { requestErrorHandler } from '../../../shared/utils/requestErrorHandler.util';
import { CODES } from '../../../shared/constants/http.codes';
import { IResponse } from '../../../shared/interfaces/response.interface';

interface RedirectShortBody {
  password: string;
}

export const redirectShort = async (
  req: FastifyRequest<{ Body: RedirectShortBody }>,
  res: FastifyReply
): Promise<IResponse> => {
  const errorMessage: string = 'Error redirecting short';
  try {
    const { shorten_id } = req.params as {
      [PARAMS.SHORTEN_ID]: string;
    };
    const password: string = req.body?.password;
    const short = await Short.findOne({ short: shorten_id });

    if (!short || !short.target || !short.active || short.deleted) {
      return res.status(404).send({ message: 'Invalid short' });
    }

    if (short.password) {
      const passwordMatch: boolean = await (password
        ? comparePasswords(password, short.password)
        : false);

      if (!passwordMatch) {
        // TODO: Redirect to protected shorts and manage wrong password
        return res
          .status(CODES.Unauthorized)
          .send({ message: 'This short is protected with a password' });
      }
    }

    if (short.expires && isPastDate(short.expires)) {
      // TODO: Redirect to expired shorts page
      // TODO: Notify creator if someone try to access an expired short
      return res
        .status(CODES.Unauthorized)
        .send({ message: `Short expired at ${short.expires}` });
    }

    if (short.accessLimit && short.accessCount >= short.accessLimit) {
      short.accessAttendsOverLimit += 1;
      await short.save();
      // TODO: Notify creator if someone reach the access limit
      return res.status(CODES.Unauthorized).send({
        message: `This short is limited to ${short.accessLimit} access`,
      });
    }

    if (short.activation && isFutureDate(short.activation)) {
      // TODO: Redirect to non-active shorts page
      return res
        .status(CODES.Unauthorized)
        .send({ message: `Short will be active at ${short.activation}` });
    }

    short.accessCount += 1;
    short.lastRead = new Date();
    await short.save();

    return res.redirect(short.target);
  } catch (error: any) {
    return res
      .status(
        error.isOperational ? CODES.BadRequest : CODES.InternalServerError
      )
      .send({
        error: requestErrorHandler(error),
        message: errorMessage,
      });
  }
};
