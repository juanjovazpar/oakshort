import { getFingerPrint } from '../../utils/fingerprint.util';
import * as browserStorage from '../../utils/sessionStorage.util';

const token = browserStorage.getAuthToken();
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
