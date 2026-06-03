import type { QueryClient } from '@tanstack/react-query';

import type { PostListApiParams } from '@/entities/post-list/model/post-list-filters';
import {
  getGetPostContentsApiInfiniteQueryKey,
  getGetPostContentsApiInfiniteQueryOptions,
  useGetPostContentsApiInfinite,
} from '@/shared/api/generated';

type Params = {
  params?: PostListApiParams;
  options?: RequestInit;
};

export const getPostListQueryKey = (params?: PostListApiParams) => {
  return getGetPostContentsApiInfiniteQueryKey(params);
};

export const useGetPostList = ({ options, params }: Params) => {
  return useGetPostContentsApiInfinite(params, {
    request: options,
    query: {
      initialPageParam: undefined as string | undefined,
      getNextPageParam: (lastPage) => lastPage.data?.nextCursor ?? undefined,
      queryKey: getPostListQueryKey(params),
      select: (data) => data.pages.flatMap(({ data }) => data?.content ?? []),
    },
  });
};

export const fetchPostList = async (queryClient: QueryClient, { options, params }: Params) => {
  try {
    const data = await queryClient.fetchInfiniteQuery({
      ...getGetPostContentsApiInfiniteQueryOptions(params, {
        request: options,
        query: {
          initialPageParam: undefined as string | undefined,
          getNextPageParam: (lastPage) => lastPage.data?.nextCursor ?? undefined,
          queryKey: getPostListQueryKey(params),
        },
      }),
    });

    return data.pages.flatMap(({ data }) => data?.content ?? []);
  } catch {
    return [];
  }
};
