import { getFingerPrint } from '../utils/fingerprint.util';

export default (config: any) => {
  const token = localStorage.getItem('token');
  const fingerprint = localStorage.getItem('fingerprint');

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  if (fingerprint) {
    config.headers.Fingerprint = getFingerPrint();
  }

  return config;
};
