import axiosInstance from './axios';

import { ROUTES } from '../../../shared/routes';

const getDashboard = async () => await axiosInstance.get(ROUTES.DASHBOARD);

export default { getDashboard };
