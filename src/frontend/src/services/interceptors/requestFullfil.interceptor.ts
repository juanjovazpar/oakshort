import { getFingerPrint } from '../../utils/fingerprint.util';
import * as browserStorage from '../../utils/sessionStorage.util';

const fingerPrint: number = getFingerPrint();

const interceptor = (config: any) => {
  const token = browserStorage.getAuthToken();

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  if (fingerPrint) {
    config.headers.fingerprint = fingerPrint;
  }

  return config;
};

export default interceptor;
