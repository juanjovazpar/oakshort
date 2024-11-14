import axiosInstance from './axios';

const service = {
  signin: async () => axiosInstance.post('http://localhost:4000/signin'),
  signup: async (user: any) =>
    axiosInstance.post('http://localhost:4000/auth/signup', user),
  forgotPassword: async () =>
    axiosInstance.post('http://localhost:4000/auth/forgot'),
};

export default service;
