import { useQueries } from '@tanstack/react-query';

import { COMMENT_REQUEST_BATCH_SIZE } from '@/entities/comment/config/constants';
import type { CustomFetchInit } from '@/shared/api/custom-fetch';
import { getGetCommentViewerStatesApiQueryKey, getGetCommentViewerStatesApiQueryOptions } from '@/shared/api/generated';
import { chunkArray } from '@/shared/lib/chunk-array';

type Params = {
  commentIds: string[];
  enabled: boolean;
  options?: CustomFetchInit;
};

export const getCommentViewerStatesQueryKey = () => {
  return getGetCommentViewerStatesApiQueryKey();
};

export const useGetCommentViewerStates = ({ commentIds, enabled, options }: Params) => {
  const commentIdChunks = chunkArray(commentIds, COMMENT_REQUEST_BATCH_SIZE);
  const queries = useQueries({
    queries: commentIdChunks.map((commentIdChunk) =>
      getGetCommentViewerStatesApiQueryOptions(
        { commentIds: commentIdChunk },
        {
          request: options,
          query: {
            enabled: enabled && commentIdChunk.length > 0,
          },
        },
      ),
    ),
  });

  return {
    data: queries.flatMap((query) => query.data?.data ?? []),
    isPending: enabled && queries.some((query) => query.isPending),
  };
};
