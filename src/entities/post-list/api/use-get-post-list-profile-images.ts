import type { QueryClient } from '@tanstack/react-query';
import { useQueries } from '@tanstack/react-query';

import { POST_LIST_REQUEST_BATCH_SIZE } from '@/entities/post-list/config/constants';
import { getGetUserProfileImagesApiQueryOptions, prefetchGetUserProfileImagesApiQuery } from '@/shared/api/generated';
import { chunkArray } from '@/shared/lib/chunk-array';

type Params = {
  authorIds: string[];
  options?: RequestInit;
};

export const useGetPostListProfileImages = ({ authorIds, options }: Params) => {
  const userIdChunks = chunkArray(authorIds, POST_LIST_REQUEST_BATCH_SIZE);
  const queries = useQueries({
    queries: userIdChunks.map((userIdChunk) =>
      getGetUserProfileImagesApiQueryOptions(
        { userIds: userIdChunk },
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

export const prefetchGetPostListProfileImages = async (queryClient: QueryClient, { authorIds, options }: Params) => {
  const userIdChunks = chunkArray(authorIds, POST_LIST_REQUEST_BATCH_SIZE);

  if (userIdChunks.length <= 0) return queryClient;

  await Promise.all(
    userIdChunks.map((userIdChunk) =>
      prefetchGetUserProfileImagesApiQuery(queryClient, { userIds: userIdChunk }, { request: options }),
    ),
  );

  return queryClient;
};
