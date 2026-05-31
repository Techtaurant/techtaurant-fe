import type { QueryClient } from '@tanstack/react-query';

import type { PostListApiParams } from '@/entities/post-list/model/post-list-filters';
import {
  getGetPostsApiInfiniteQueryKey,
  prefetchGetPostsApiInfiniteQuery,
  useGetPostsApiInfinite,
} from '@/shared/api/generated';

type Params = {
  params?: PostListApiParams;
  options?: RequestInit;
};

export const getPostListQueryKey = (params?: PostListApiParams) => {
  return getGetPostsApiInfiniteQueryKey(params);
};

export const useGetPostList = ({ params, options }: Params) => {
  return useGetPostsApiInfinite(params, {
    request: options,
    query: {
      initialPageParam: undefined as string | undefined,
      getNextPageParam: (lastPage) => lastPage.data?.nextCursor ?? undefined,
      queryKey: getPostListQueryKey(params),
      select: (data) => data.pages.flatMap(({ data }) => data?.content ?? []),
    },
  });
};

export const prefetchGetPostList = (queryClient: QueryClient, { params, options }: Params) => {
  return prefetchGetPostsApiInfiniteQuery(queryClient, params, {
    request: options,
    query: {
      initialPageParam: undefined as string | undefined,
      getNextPageParam: (lastPage) => lastPage.data?.nextCursor ?? undefined,
      queryKey: getPostListQueryKey(params),
    },
  });
};
