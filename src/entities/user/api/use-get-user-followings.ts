import { getGetFollowingsApiQueryKey, useGetFollowingsApi } from '@/shared/api/generated';

type Params = {
  enabled: boolean;
  options?: RequestInit;
  userId?: string;
};

export const getUserFollowingsQueryKey = (userId: string) => {
  return getGetFollowingsApiQueryKey(userId);
};

export const useGetUserFollowings = ({ enabled, options, userId }: Params) => {
  return useGetFollowingsApi(userId ?? '', {
    request: options,
    query: {
      enabled: enabled && Boolean(userId),
      queryKey: getUserFollowingsQueryKey(userId ?? ''),
      select: (response) => response.data ?? [],
    },
  });
};
