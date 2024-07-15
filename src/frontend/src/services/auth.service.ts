import axiosInstance from './axios';

import { ROUTES } from '../../../routes';

const signin = async () => await axiosInstance.post('ROUTES.SIGNIN');

const signup = async () => await axiosInstance.post('ROUTES.SIGNUP');

const forgotPassword = async () =>
  await axiosInstance.post('ROUTES.FORGOT_PASSWORD');

export default { signin, signup, forgotPassword };
