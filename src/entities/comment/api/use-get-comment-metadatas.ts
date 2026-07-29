import { useQueries } from '@tanstack/react-query';

import { COMMENT_REQUEST_BATCH_SIZE } from '@/entities/comment/config/constants';
import { getGetCommentMetadatasApiQueryKey, getGetCommentMetadatasApiQueryOptions } from '@/shared/api/generated';
import { chunkArray } from '@/shared/lib/chunk-array';

type Params = {
  commentIds: string[];
  options?: RequestInit;
};

export const getCommentMetadatasQueryKey = () => {
  return getGetCommentMetadatasApiQueryKey();
};

export const useGetCommentMetadatas = ({ commentIds, options }: Params) => {
  const commentIdChunks = chunkArray(commentIds, COMMENT_REQUEST_BATCH_SIZE);
  const queries = useQueries({
    queries: commentIdChunks.map((commentIdChunk) =>
      getGetCommentMetadatasApiQueryOptions(
        { commentIds: commentIdChunk },
        {
          request: options,
        },
      ),
    ),
  });

  return {
    data: queries.flatMap((query) => query.data?.data ?? []),
    isPending: queries.some((query) => query.isPending),
  };
};
