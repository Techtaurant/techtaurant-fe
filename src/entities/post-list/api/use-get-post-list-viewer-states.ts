import { useQueries } from '@tanstack/react-query';

import { POST_LIST_REQUEST_BATCH_SIZE } from '@/entities/post-list/config/constants';
import { getGetPostViewerStatesApiQueryOptions } from '@/shared/api/generated';
import { chunkArray } from '@/shared/lib/chunk-array';

type Params = {
  enabled: boolean;
  options?: RequestInit;
  postIds: string[];
};

export const useGetPostListViewerStates = ({ enabled, options, postIds }: Params) => {
  const postIdChunks = enabled ? chunkArray(postIds, POST_LIST_REQUEST_BATCH_SIZE) : [];
  const queries = useQueries({
    queries: postIdChunks.map((postIdChunk) =>
      getGetPostViewerStatesApiQueryOptions(
        { postIds: postIdChunk },
        {
          request: options,
          query: {
            retry: false,
          },
        },
      ),
    ),
  });

  return {
    data: queries.flatMap((query) => query.data?.data ?? []),
    isPending: queries.some((query) => query.isPending),
  };
};
