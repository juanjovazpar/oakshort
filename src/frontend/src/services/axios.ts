import axios from 'axios';

import RequestInterceptor from './request.interceptor';
import ResponseInterceptor from './response.interceptor';

const axiosInstance = axios.create({
  baseURL: 'https://api.example.com',
  timeout: 10000,
});

axiosInstance.interceptors.request.use(RequestInterceptor, (error) => {
  return Promise.reject(error);
});

axiosInstance.interceptors.response.use((response) => {
  return response;
}, ResponseInterceptor);

export default axiosInstance;
