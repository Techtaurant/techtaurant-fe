import type { QueryClient } from '@tanstack/react-query';
import { keepPreviousData } from '@tanstack/react-query';

import type { PostListApiParams } from '@/entities/post-list/model/post-list-filters';
import type { CustomFetchInit } from '@/shared/api/custom-fetch';
import {
  getGetPostsApiInfiniteQueryKey,
  prefetchGetPostsApiInfiniteQuery,
  useGetPostsApiInfinite,
} from '@/shared/api/generated';

type Params = {
  params?: PostListApiParams;
  options?: CustomFetchInit;
};

export const getPostListQueryKey = (params?: PostListApiParams) => {
  return getGetPostsApiInfiniteQueryKey(params);
};

export const useGetPostList = ({ options, params }: Params) => {
  return useGetPostsApiInfinite(params, {
    request: options,
    query: {
      getNextPageParam: (lastPage) => lastPage.data?.nextCursor ?? undefined,
      initialPageParam: undefined as string | undefined,
      placeholderData: keepPreviousData,
      queryKey: getPostListQueryKey(params),
      select: (data) => data.pages.flatMap(({ data }) => data?.content ?? []),
    },
  });
};

export const prefetchGetPostList = (queryClient: QueryClient, { options, params }: Params) => {
  return prefetchGetPostsApiInfiniteQuery(queryClient, params, {
    request: options,
    query: {
      getNextPageParam: (lastPage) => lastPage.data?.nextCursor ?? undefined,
      initialPageParam: undefined as string | undefined,
      queryKey: getPostListQueryKey(params),
    },
  });
};
