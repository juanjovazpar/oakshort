import { FastifyRequest, FastifyReply } from 'fastify';
import Short from '../models/short.model';
import { CODES } from '../../../shared/constants/http.codes';
import { requestErrorHandler } from '../../../shared/utils/requestErrorHandler.util';
import { IResponse } from '../../../shared/interfaces/response.interface';

export const updateShort = async (
  req: FastifyRequest,
  res: FastifyReply
): Promise<IResponse> => {
  const errorMessage: string = 'Error updating short';
  try {
    // @ts-ignore
    const _id = req.short?._id;
    // @ts-ignore
    const { target } = req.body;
    const short = await Short.findByIdAndUpdate(_id, { target }, { new: true })
      .select(['-deleted', '-_id', '-fingerprint', '-owner'])
      .lean();

    if (!short) {
      return res.status(CODES.NotFound).send({ message: 'Short not found' });
    }

    return res.status(CODES.OK).send({ payload: short });
  } catch (error) {
    return res.send({
      error: requestErrorHandler(error),
      message: errorMessage,
    });
  }
};

export const deleteShort = async (
  req: FastifyRequest,
  res: FastifyReply
): Promise<void> => {
  const errorMessage: string = 'Error deleting short';
  try {
    // @ts-ignore
    const { _id } = req.short;
    const short = await Short.findByIdAndUpdate(_id, {
      deleted: true,
    });

    if (!short) {
      return res.status(CODES.NotFound).send({ message: 'Short not found' });
    }

    return res.status(CODES.OK).send({ message: 'Short deleted' });
  } catch (error) {
    return res.send({
      error: requestErrorHandler(error),
      message: errorMessage,
    });
  }
};
