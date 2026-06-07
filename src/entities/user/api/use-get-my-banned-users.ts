import { getGetMyBannedUsersApiQueryKey, useGetMyBannedUsersApi } from '@/shared/api/generated';

export const getMyBannedUsersQueryKey = () => {
  return getGetMyBannedUsersApiQueryKey();
};

export const useGetMyBannedUsers = (options?: RequestInit) => {
  return useGetMyBannedUsersApi({
    request: options,
    query: {
      select: (response) => response.data ?? [],
    },
  });
};
