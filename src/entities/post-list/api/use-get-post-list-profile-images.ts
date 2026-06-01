import type { QueryClient } from '@tanstack/react-query';
import { useQueries } from '@tanstack/react-query';

import { chunkPostListRequestValues } from '@/entities/post-list/lib/chunk-post-list-request-values';
import { getGetUserProfileImagesApiQueryOptions, prefetchGetUserProfileImagesApiQuery } from '@/shared/api/generated';

type Params = {
  authorIdGroups: string[][];
  options?: RequestInit;
};

export const useGetPostListProfileImages = ({ authorIdGroups, options }: Params) => {
  const userIdChunks = authorIdGroups.flatMap(chunkPostListRequestValues);
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

export const prefetchGetPostListProfileImages = async (
  queryClient: QueryClient,
  { authorIdGroups, options }: Params,
) => {
  const userIdChunks = authorIdGroups.flatMap(chunkPostListRequestValues);

  if (userIdChunks.length <= 0) return queryClient;

  await Promise.all(
    userIdChunks.map((userIdChunk) =>
      prefetchGetUserProfileImagesApiQuery(queryClient, { userIds: userIdChunk }, { request: options }),
    ),
  );

  return queryClient;
};
