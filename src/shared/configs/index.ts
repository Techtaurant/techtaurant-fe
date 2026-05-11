export const IS_SERVER = typeof window === 'undefined';

export const ENVIRONMENT = (() => {
  if (!process.env.NEXT_PUBLIC_ENV) {
    throw new Error('NEXT_PUBLIC_ENV 환경 변수를 확인해주세요.');
  }
  return process.env.NEXT_PUBLIC_ENV as 'local' | 'development' | 'production';
})();
