import { FastifyReply } from 'fastify';

import { hashPassword } from '../../../shared/utils/password.util';
import Short from '../models/short.model';
import { CODES } from '../../../shared/constants/http.codes';
import { requestErrorHandler } from '../../../shared/utils/requestErrorHandler.util';
import { IResponse } from '../../../shared/interfaces/response.interface';
import { IShort } from '../../../shared/interfaces/short.interface';

export const getShorts = async (
  req: any,
  res: FastifyReply
): Promise<IResponse> => {
  const errorMessage: string = 'Error getting shorts';
  try {
    const fingerprint = req.fingerprint;
    const owner = req.user?.sub;

    if (!fingerprint && !owner) {
      return res.status(CODES.Unauthorized).send({
        error: 'Who are you?!',
        message: errorMessage,
      });
    }

    const shorts: IShort[] | [] = await Short.find({
      deleted: false,
      ...(owner ? { owner } : { fingerprint }),
    })
      .select(['-deleted', '-_id', '-fingerprint'])
      .lean();

    return res.status(CODES.OK).send({
      payload: shorts,
    });
  } catch (error: any) {
    return res
      .status(
        error.isOperational ? CODES.BadRequest : CODES.InternalServerError
      )
      .send({
        error: error,
        message: errorMessage,
      });
  }
};

export const createShort = async (
  req: any,
  res: FastifyReply
): Promise<IResponse> => {
  const errorMessage: string = 'Error creating new short';
  try {
    const fingerprint = req.fingerprint;
    const owner = req.user?.sub;
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
      owner,
    });

    await newshort.save();

    newshort = newshort.toObject();
    delete newshort.deleted;
    // @ts-ignore
    delete newshort._id;
    delete newshort.password;
    delete newshort.fingerprint;

    return res.status(CODES.Created).send({ payload: newshort });
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
