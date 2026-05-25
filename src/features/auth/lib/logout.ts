import { logoutApi } from '@/shared/api/generated';

export const requestLogout = async () => {
  return await logoutApi();
};
