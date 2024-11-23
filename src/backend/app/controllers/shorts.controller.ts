import { FastifyReply } from 'fastify';

import { hashPassword } from '../../../shared/utils/password.util';
import Short from '../models/short.model';
import { CODES } from '../../../shared/constants/http.codes';
import { requestErrorHandler } from '../../../shared/utils/requestErrorHandler.util';

export const getShorts = async (req: any, res: FastifyReply) => {
  const errorMessage: string = 'Error getting shorts';
  try {
    const { fingerprint } = req as { fingerprint: string };
    const documents = await Short.find({ deleted: false, fingerprint }).select([
      '-deleted',
      '-_id',
    ]);

    res.status(CODES.OK).send({
      payload: documents,
    });
  } catch (error: any) {
    return res.status(CODES.BadRequest).send({
      error: requestErrorHandler(error),
      message: errorMessage,
    });
  }
};

export const createShort = async (req: any, res: FastifyReply) => {
  const errorMessage: string = 'Error creating new short';

  try {
    const { fingerprint } = req as { fingerprint: string };
    const { short, target, expires, activation, accessLimit } = req.body;
    let { password } = req.body;

    if (password) {
      password = await hashPassword(password);
    }

    let newshort = new Short({
      short,
      target,
      expires,
      activation,
      accessLimit,
      password,
      fingerprint,
    });

    await newshort.save();

    newshort = newshort.toObject();
    delete newshort.deleted;
    // @ts-ignore
    delete newshort._id;
    delete newshort.password;

    res.status(CODES.Created).send({ payload: newshort });
  } catch (error: any) {
    return res.status(CODES.BadRequest).send({
      error: requestErrorHandler(error),
      message: errorMessage,
    });
  }
};
