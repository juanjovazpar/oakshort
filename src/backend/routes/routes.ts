export enum PARAMS {
  SHORTEN_ID = 'shorten_id',
}

export enum ROUTES {
  SIGNIN = '/signin',
  SIGNUP = '/signup',
  SHORTS = '/shorts',
  REDIRECT = `/:${PARAMS.SHORTEN_ID}`,
}
