import axiosInstance from './axios';

const signin = async () => await axiosInstance.get('/data-endpoint');

const signup = async () => await axiosInstance.get('/data-endpoint');

const forgotPassword = async () => await axiosInstance.get('/data-endpoint');

export default { signin, signup, forgotPassword };
