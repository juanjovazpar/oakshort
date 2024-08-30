import axiosInstance from './axios';

import { ROUTES } from '../../../shared/routes';

const service = {
  getShorts: async () => await axiosInstance.get(ROUTES.SHORTS),
  createShort: async () => await axiosInstance.post(ROUTES.SHORTS),
};

export default service;
