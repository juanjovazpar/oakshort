const enum ENDPOINTS {
  AUTH = '/auth',
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
  SHORT = `/shorts/:${PARAMS.SHORTEN_ID}`,
  SHORTS = '/shorts',
  REDIRECT = `/:${PARAMS.SHORTEN_ID}`,
}
