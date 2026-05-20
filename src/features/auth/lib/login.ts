import { API_BASE_URL, IS_SERVER } from '@/shared/config';
import { getCurrentPath } from '@/shared/lib/get-current-path';

const getGoogleLoginEndpoint = (origin: string, redirectPath: string) => {
  const url = new URL('/oauth2/authorization/google', API_BASE_URL);

  url.searchParams.set('origin', origin);
  url.searchParams.set('redirect-uri', redirectPath);
  url.searchParams.set('failure-redirect-uri', redirectPath);

  return url.toString();
};

export const startGoogleLogin = (redirectPath = getCurrentPath()) => {
  if (IS_SERVER) {
    throw new Error('startGoogleLogin은 클라이언트 환경에서만 호출할 수 있습니다.');
  }

  window.location.href = getGoogleLoginEndpoint(window.location.origin, redirectPath);
};
