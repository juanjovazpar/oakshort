import axiosInstance from './axios';

import { ROUTES } from '../../../shared/routes';

const getShorts = async () => await axiosInstance.get(ROUTES.SHORTS);

const createShort = async () => await axiosInstance.post(ROUTES.SHORTS);

export default { getShorts, createShort };
