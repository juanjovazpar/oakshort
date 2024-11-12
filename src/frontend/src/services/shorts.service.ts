import axiosInstance from './axios';

const service = {
  getShorts: async () => axiosInstance.get('http://localhost:4000/shorts'),

  createShort: async (short: any) =>
    axiosInstance.post('http://localhost:4000/shorts', short),
};

export default service;
