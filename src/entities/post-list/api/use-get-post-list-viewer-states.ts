import { useQueries } from '@tanstack/react-query';

import { POST_LIST_REQUEST_BATCH_SIZE } from '@/entities/post-list/config/constants';
import { getGetPostViewerStatesApiQueryOptions } from '@/shared/api/generated';
import { chunkArray } from '@/shared/lib/chunk-array';

type Params = {
  enabled: boolean;
  options?: RequestInit;
  postIdGroups: string[][];
};

export const useGetPostListViewerStates = ({ enabled, options, postIdGroups }: Params) => {
  const postIdChunks = enabled
    ? postIdGroups.flatMap((postIds) => chunkArray(postIds, POST_LIST_REQUEST_BATCH_SIZE))
    : [];
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
  };
};
