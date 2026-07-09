import type { QueryClient } from '@tanstack/react-query';
import { useQueries } from '@tanstack/react-query';

import { POST_LIST_REQUEST_BATCH_SIZE } from '@/entities/post-list/config/constants';
import type { CustomFetchInit } from '@/shared/api/custom-fetch';
import {
  getGetPostViewerStatesApiQueryKey,
  getGetPostViewerStatesApiQueryOptions,
  prefetchGetPostViewerStatesApiQuery,
} from '@/shared/api/generated';
import { chunkArray } from '@/shared/lib/chunk-array';

type Params = {
  options?: CustomFetchInit;
  postIds: string[];
};

type UseParams = Params & {
  enabled: boolean;
};

export const getPostListViewerStatesQueryKey = () => {
  return getGetPostViewerStatesApiQueryKey();
};

export const useGetPostListViewerStates = ({ enabled, options, postIds }: UseParams) => {
  const postIdChunks = enabled ? chunkArray(postIds, POST_LIST_REQUEST_BATCH_SIZE) : [];
  const queries = useQueries({
    queries: postIdChunks.map((postIdChunk) =>
      getGetPostViewerStatesApiQueryOptions(
        { postIds: postIdChunk },
        {
          request: options,
        },
      ),
    ),
  });

  return {
    data: queries.flatMap((query) => query.data?.data ?? []),
  };
};

export const prefetchGetPostListViewerStates = async (queryClient: QueryClient, { options, postIds }: Params) => {
  const postIdChunks = chunkArray(postIds, POST_LIST_REQUEST_BATCH_SIZE);

  if (postIdChunks.length <= 0) return;

  await Promise.all(
    postIdChunks.map((postIdChunk) =>
      prefetchGetPostViewerStatesApiQuery(
        queryClient,
        { postIds: postIdChunk },
        {
          request: options,
        },
      ),
    ),
  );
};
