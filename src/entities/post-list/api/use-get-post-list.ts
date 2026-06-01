import type { QueryClient } from '@tanstack/react-query';

import { getPostListContentData } from '@/entities/post-list/lib/get-post-list-relations';
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
      select: (data) => getPostListContentData(data.pages),
    },
  });
};

export const prefetchGetPostList = async (queryClient: QueryClient, { options, params }: Params) => {
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

  return getPostListContentData(data.pages);
};
