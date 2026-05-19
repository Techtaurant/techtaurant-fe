import type { QueryClient } from '@tanstack/react-query';

import {
  getGetPostsApiInfiniteQueryKey,
  type GetPostsApiParams,
  prefetchGetPostsApiInfiniteQuery,
  useGetPostsApiInfinite,
} from '@/shared/api/generated';

type OmitCursorParams = Omit<GetPostsApiParams, 'cursor'>;

type Params = {
  params?: OmitCursorParams;
  options?: RequestInit;
};

export const getPostListQueryKey = (params?: OmitCursorParams) => {
  return getGetPostsApiInfiniteQueryKey(params);
};

export const useGetPostList = ({ params, options }: Params) => {
  return useGetPostsApiInfinite(params, {
    request: options,
    query: {
      initialPageParam: undefined as string | undefined,
      getNextPageParam: (lastPage) => lastPage.data?.nextCursor ?? undefined,
      queryKey: getPostListQueryKey(params),
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
