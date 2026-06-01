import { useQueries } from '@tanstack/react-query';

import { chunkPostListRequestValues } from '@/entities/post-list/lib/chunk-post-list-request-values';
import { getGetPostViewerStatesApiQueryOptions } from '@/shared/api/generated';

type Params = {
  enabled: boolean;
  options?: RequestInit;
  postIdGroups: string[][];
};

export const useGetPostListViewerStates = ({ enabled, options, postIdGroups }: Params) => {
  const postIdChunks = enabled ? postIdGroups.flatMap(chunkPostListRequestValues) : [];
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
