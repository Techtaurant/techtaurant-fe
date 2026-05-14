import { IS_SERVER } from '@/shared/config';

export const getCurrentPath = () => {
  if (IS_SERVER) {
    throw new Error('getCurrentPath는 클라이언트 환경에서만 호출할 수 있습니다.');
  }

  return `${window.location.pathname}${window.location.search}${window.location.hash}`;
};
