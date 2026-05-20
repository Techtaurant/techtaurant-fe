import { logout } from '@/shared/api/generated';

export const requestLogout = async () => {
  const response = await logout();

  if (response.status !== 200) {
    throw new Error('로그아웃에 실패했습니다.');
  }
};
