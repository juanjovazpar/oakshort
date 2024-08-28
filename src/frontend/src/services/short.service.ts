import axiosInstance from './axios';

import { ROUTES } from '../../../shared/routes';

const getShort = async () => await axiosInstance.get(ROUTES.SHORT);

const updateShort = async () => await axiosInstance.patch(ROUTES.SHORT);

const activateShort = async () => await axiosInstance.patch(ROUTES.SHORT);

const deleteShort = async () => await axiosInstance.delete(ROUTES.SHORT);

export default {
  getShort,
  updateShort,
  deleteShort,
  activateShort,
};
