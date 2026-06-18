import { IS_SERVER } from '@/shared/config';

const ONE_YEAR_IN_SECONDS = 60 * 60 * 24 * 365;

export const getCookie = (name: string): string | null => {
  if (IS_SERVER) return null;

  const match = document.cookie.match(new RegExp(`(?:^|; )${name}=([^;]*)`));
  return match ? decodeURIComponent(match[1]) : null;
};

export const setCookie = (name: string, value: string, maxAgeSeconds = ONE_YEAR_IN_SECONDS): void => {
  if (IS_SERVER) return;

  document.cookie = `${name}=${encodeURIComponent(value)}; path=/; max-age=${maxAgeSeconds}`;
};
