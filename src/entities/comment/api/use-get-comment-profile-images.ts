import { useQueries } from '@tanstack/react-query';

import { COMMENT_REQUEST_BATCH_SIZE } from '@/entities/comment/config/constants';
import { getGetUserProfileImagesApiQueryOptions } from '@/shared/api/generated';
import { chunkArray } from '@/shared/lib/chunk-array';

type Params = {
  authorIds: string[];
  options?: RequestInit;
};

export const useGetCommentProfileImages = ({ authorIds, options }: Params) => {
  const authorIdChunks = chunkArray(authorIds, COMMENT_REQUEST_BATCH_SIZE);
  const queries = useQueries({
    queries: authorIdChunks.map((authorIdChunk) =>
      getGetUserProfileImagesApiQueryOptions(
        { userIds: authorIdChunk },
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
