import crypto from 'crypto';

export const base64UrlEncode = (input: Buffer): string => {
  return input
    .toString('base64')
    .replace(/\+/g, '-')
    .replace(/\//g, '_')
    .replace(/=+$/, '');
};

export const getHashedToken = async (
  expiration: number = 24 * 60 * 60 * 1000
): Promise<string> => {
  const expirationTime = Date.now() + expiration;
  const randomBytes = crypto.randomBytes(32);
  const tokens = `${base64UrlEncode(randomBytes)}.${expirationTime}`;

  return tokens;
};
