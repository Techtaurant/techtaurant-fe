import type { QueryClient } from '@tanstack/react-query';

import type { CustomFetchInit } from '@/shared/api/custom-fetch';
import type { ApiResponseUserResponse } from '@/shared/api/generated';
import { getGetMeApiQueryKey, getGetMeApiQueryOptions, useGetMeApi } from '@/shared/api/generated';

const ANONYMOUS_ME_RESPONSE = {
  status: 401,
  message: 'Unauthorized',
} satisfies ApiResponseUserResponse;

export const getMeQueryKey = () => {
  return getGetMeApiQueryKey();
};

export const useGetMe = (options?: CustomFetchInit) => {
  return useGetMeApi({
    request: options,
    query: {
      select: (response) => response.data,
    },
  });
};

export const prefetchGetMe = async (queryClient: QueryClient, options?: CustomFetchInit) => {
  try {
    const response = await queryClient.fetchQuery(
      getGetMeApiQueryOptions({
        request: options,
        query: {
          queryKey: getMeQueryKey(),
        },
      }),
    );

    return response.data ?? null;
  } catch {
    queryClient.setQueryData<ApiResponseUserResponse>(getMeQueryKey(), ANONYMOUS_ME_RESPONSE);
    return null;
  }
};
