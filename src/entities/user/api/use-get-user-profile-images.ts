import type { QueryClient } from '@tanstack/react-query';

import { getGetUserProfileImagesApiQueryKey, prefetchGetUserProfileImagesApiQuery } from '@/shared/api/generated';

type Params = {
  options?: RequestInit;
  userIds: string[];
};

const toUserProfileImagesParams = (userIds: string[]) => {
  return {
    userIds,
  };
};

const getUserProfileImagesQueryKey = (userIds: string[]) => {
  return getGetUserProfileImagesApiQueryKey(toUserProfileImagesParams(userIds));
};

export const prefetchGetUserProfileImages = async (queryClient: QueryClient, { options, userIds }: Params) => {
  if (userIds.length <= 0) return;

  await prefetchGetUserProfileImagesApiQuery(queryClient, toUserProfileImagesParams(userIds), {
    request: options,
    query: {
      queryKey: getUserProfileImagesQueryKey(userIds),
    },
  });
};
