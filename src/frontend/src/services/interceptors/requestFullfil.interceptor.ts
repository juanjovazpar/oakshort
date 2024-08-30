import { getFingerPrint } from '../../utils/fingerprint.util';

const token = localStorage.getItem('token');
const fingerPrint: number = getFingerPrint();

const interceptor = (config: any) => {
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  if (fingerPrint) {
    config.headers.Fingerprint = fingerPrint;
  }

  return config;
};

export default interceptor;
