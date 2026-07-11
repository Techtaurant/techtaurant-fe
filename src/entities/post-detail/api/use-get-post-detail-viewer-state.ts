import type { QueryClient } from '@tanstack/react-query';

import type { CustomFetchInit } from '@/shared/api/custom-fetch';
import {
  getGetPostViewerStatesApiQueryKey,
  prefetchGetPostViewerStatesApiQuery,
  useGetPostViewerStatesApi,
} from '@/shared/api/generated';

type Params = {
  enabled: boolean;
  options?: CustomFetchInit;
  postId: string;
};

type PrefetchParams = Omit<Params, 'enabled'>;

const toPostViewerStateParams = (postId: string) => {
  return {
    postIds: [postId],
  };
};

export const getPostDetailViewerStateQueryKey = (postId: string) => {
  return getGetPostViewerStatesApiQueryKey(toPostViewerStateParams(postId));
};

export const useGetPostDetailViewerState = ({ enabled, options, postId }: Params) => {
  return useGetPostViewerStatesApi(toPostViewerStateParams(postId), {
    request: options,
    query: {
      enabled: enabled && Boolean(postId),
      queryKey: getPostDetailViewerStateQueryKey(postId),
      select: (response) => response.data?.[0],
    },
  });
};

export const prefetchGetPostDetailViewerState = async (
  queryClient: QueryClient,
  { options, postId }: PrefetchParams,
) => {
  if (!postId) return;

  await prefetchGetPostViewerStatesApiQuery(queryClient, toPostViewerStateParams(postId), {
    request: options,
    query: {
      queryKey: getPostDetailViewerStateQueryKey(postId),
    },
  });
};
