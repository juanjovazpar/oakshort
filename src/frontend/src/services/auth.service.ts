import axiosInstance from './axios';

const service = {
  signIn: async (user: any): Promise<any> =>
    axiosInstance.post('http://localhost:4000/auth/signin', user),

  register: async (user: any): Promise<any> =>
    axiosInstance.post('http://localhost:4000/auth/register', user),

  forgotPassword: async (user: any): Promise<any> =>
    axiosInstance.post('http://localhost:4000/auth/forgot', user),

  verify: async (token: string): Promise<any> =>
    axiosInstance.get(`http://localhost:4000/auth/verify/${token}`),

  resetPassword: async (token: string, password: any): Promise<any> =>
    axiosInstance.post(
      `http://localhost:4000/auth/reset-password/${token}`,
      password
    ),
};

export default service;
