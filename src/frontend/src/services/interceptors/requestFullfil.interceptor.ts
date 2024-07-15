import { getFingerPrint } from '../../utils/fingerprint.util';

let fingerPrint: number = getFingerPrint();

export default (config: any) => {
  const token = localStorage.getItem('token');

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  config.headers.Fingerprint = fingerPrint;

  return config;
};
