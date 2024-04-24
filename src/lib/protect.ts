import { cookies } from 'next/headers';

export const decode = (input: string) => atob(input);

export const encode = (input: string) => btoa(input);

export const isValidProtectPassword = (password: string) => {
  return password === process.env.PROTECT_SECRET;
};

export const isValidProtectPasswordInCookies = () => {
  const hashInCookies = cookies().get('protect-password')?.value ?? '';
  const isAuthorized = isValidProtectPassword(decode(hashInCookies));

  return isAuthorized;
};
