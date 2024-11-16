import axiosInstance from './axios';

const service = {
  signIn: async (user: any) =>
    axiosInstance.post('http://localhost:4000/auth/signin', user),

  signUp: async (user: any) =>
    axiosInstance.post('http://localhost:4000/auth/signup', user),

  forgotPassword: async (user: any) =>
    axiosInstance.post('http://localhost:4000/auth/forgot', user),

  verify: async (token: string) =>
    axiosInstance.get(`http://localhost:4000/auth/verify/${token}`),

  resetPassword: async (token: string, password: any) =>
    axiosInstance.post(
      `http://localhost:4000/auth/reset-password/${token}`,
      password
    ),
};

export default service;
