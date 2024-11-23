const enum ENDPOINTS {
  AUTH = '/auth',
  SHORTS = '/shorts',
  HEALTH = '/health',
}

export enum PARAMS {
  SHORTEN_ID = 'shorten_id',
  VERIFICATION_TOKEN = 'verificationToken',
  RESET_TOKEN = 'resetPasswordToken',
}

export const ROUTES = {
  HEALTH: ENDPOINTS.HEALTH,
  VERIFY: `${ENDPOINTS.AUTH}/verify/:${PARAMS.VERIFICATION_TOKEN}`,
  SIGNIN: `${ENDPOINTS.AUTH}/signin`,
  REGISTER: `${ENDPOINTS.AUTH}/register`,
  FORGOT_PASSWORD: `${ENDPOINTS.AUTH}/forgot`,
  RESET_PASSWORD: `${ENDPOINTS.AUTH}/reset-password/:${PARAMS.RESET_TOKEN}`,
  WHOAMI: `${ENDPOINTS.AUTH}/whoami`,
  SHORT: `${ENDPOINTS.SHORTS}/:${PARAMS.SHORTEN_ID}`,
  SHORTS: ENDPOINTS.SHORTS,
  REDIRECT: `/:${PARAMS.SHORTEN_ID}`,
  DASHBOARD: `/:${PARAMS.SHORTEN_ID}/dashboard`,
};
