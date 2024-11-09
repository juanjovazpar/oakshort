import axiosInstance from './axios';

const service = {
  getShorts: async () =>
    await axiosInstance.get('http://localhost:4000/shorts'),
  createShort: async (short: any) =>
    await axiosInstance.post('http://localhost:4000/shorts', short),
};

export default service;
