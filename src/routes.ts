const enum ENDPOINTS {
  AUTH = '/auth',
  SHORTS = '/shorts',
}

export enum PARAMS {
  SHORTEN_ID = 'shorten_id',
  VERIFICATION_TOKEN = 'verificationToken',
}

export enum ROUTES {
  VERIFY = `${ENDPOINTS.AUTH}/verify/:${PARAMS.VERIFICATION_TOKEN}`,
  SIGNIN = `${ENDPOINTS.AUTH}/signin`,
  SIGNUP = `${ENDPOINTS.AUTH}/signup`,
  FORGOT_PASSWORD = `${ENDPOINTS.AUTH}/forgot`,
  SHORT = `${ENDPOINTS.SHORTS}/:${PARAMS.SHORTEN_ID}`,
  SHORTS = ENDPOINTS.SHORTS,
  REDIRECT = `/:${PARAMS.SHORTEN_ID}`,
  DASHBOARD = `/:${PARAMS.SHORTEN_ID}/dashboard`,
}
