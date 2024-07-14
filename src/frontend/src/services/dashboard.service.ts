import axiosInstance from './axios';

const getDashboard = async () => await axiosInstance.get('/data-endpoint');

export default { getDashboard };
