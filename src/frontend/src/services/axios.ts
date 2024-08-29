import axios from 'axios';

import RequestInterceptor from './interceptors/requestFullfil.interceptor';
import ResponseInterceptor from './interceptors/responseFail.interceptor';

const axiosInstance = axios.create({
  baseURL: process.env.REACT_APP_API_URL || 'https://api.example.com',
  timeout: 10000,
});

axiosInstance.interceptors.request.use(RequestInterceptor, (error) =>
  Promise.reject(error)
);

axiosInstance.interceptors.response.use((response) => {
  return response;
}, ResponseInterceptor);

export default axiosInstance;
