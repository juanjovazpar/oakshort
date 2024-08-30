import axiosInstance from './axios';

import { ROUTES } from '../../../shared/routes';

const service = {
  getShort: async () => await axiosInstance.get(ROUTES.SHORT),
  updateShort: async () => await axiosInstance.patch(ROUTES.SHORT),
  activateShort: async () => await axiosInstance.patch(ROUTES.SHORT),
  deleteShort: async () => await axiosInstance.delete(ROUTES.SHORT),
};

export default service;
