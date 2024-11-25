export const PARAMS = {
  VERIFICATION_TOKEN: 'verificationToken',
  RESET_TOKEN: 'resetToken',
  SHORT_ID: 'short_id',
};

const ROUTES = {
  HOME: `/`,
  LOGIN: `/`,
  SIGNIN: `/signin`,
  SIGNUP: `/signup`,
  FORGOTTEN: `/forgotten`,
  VERIFY: `/verify`,
  RESET_PASSWORD: `/reset-password`,
  MAIN: `/hi`,
  SHORT_DETAILS: `/hi/:${PARAMS.SHORT_ID}`,
};

export default ROUTES;
