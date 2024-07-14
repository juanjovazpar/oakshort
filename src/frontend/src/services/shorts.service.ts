import axiosInstance from './axios';

const getShorts = async () => await axiosInstance.get('/data-endpoint');

export default { getShorts };
