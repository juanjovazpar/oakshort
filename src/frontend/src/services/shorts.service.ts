import axiosInstance from './axios';

const service = {
  getShorts: async (): Promise<any> =>
    axiosInstance.get('http://localhost:4000/shorts'),

  getShort: async (id: string): Promise<any> =>
    axiosInstance.get(`http://localhost:4000/shorts/${id}`),

  createShort: async (short: any): Promise<any> =>
    axiosInstance.post('http://localhost:4000/shorts', short),
};

export default service;
