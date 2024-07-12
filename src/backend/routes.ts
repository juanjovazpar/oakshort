const enum ENDPOINTS {
  AUTH = '/auth',
}

export enum PARAMS {
  SHORTEN_ID = 'shorten_id',
}

export enum ROUTES {
  SIGNIN = `${ENDPOINTS.AUTH}/signin`,
  SIGNUP = `${ENDPOINTS.AUTH}/signup`,
  FORGOT_PASSWORD = `${ENDPOINTS.AUTH}/forgot`,
  VERIFY = `${ENDPOINTS.AUTH}/verify`,
  SHORT = `/shorts/:${PARAMS.SHORTEN_ID}`,
  SHORTS = '/shorts',
  REDIRECT = `/:${PARAMS.SHORTEN_ID}`,
}
