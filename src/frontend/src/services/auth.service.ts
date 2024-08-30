import axiosInstance from './axios';

import { ROUTES } from '../../../shared/routes';

const service = {
  signin: async () => await axiosInstance.post(ROUTES.SIGNIN),
  signup: async () => await axiosInstance.post(ROUTES.SIGNUP),
  forgotPassword: async () => await axiosInstance.post(ROUTES.FORGOT_PASSWORD),
};

export default service;
