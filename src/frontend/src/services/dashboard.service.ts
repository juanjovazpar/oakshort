import axiosInstance from './axios';

import { ROUTES } from '../../../shared/routes';

const service = {
  getDashboard: async () => await axiosInstance.get(ROUTES.DASHBOARD),
};

export default service;
