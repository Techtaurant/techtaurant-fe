import type { QueryClient } from '@tanstack/react-query';
import { useQueries } from '@tanstack/react-query';

import { chunkPostListRequestValues } from '@/entities/post-list/lib/chunk-post-list-request-values';
import { getGetPostMetadatasApiQueryOptions, prefetchGetPostMetadatasApiQuery } from '@/shared/api/generated';

type Params = {
  options?: RequestInit;
  postIdGroups: string[][];
};

export const useGetPostListMetadatas = ({ options, postIdGroups }: Params) => {
  const postIdChunks = postIdGroups.flatMap(chunkPostListRequestValues);
  const queries = useQueries({
    queries: postIdChunks.map((postIdChunk) =>
      getGetPostMetadatasApiQueryOptions(
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

export const prefetchGetPostListMetadatas = async (queryClient: QueryClient, { options, postIdGroups }: Params) => {
  const postIdChunks = postIdGroups.flatMap(chunkPostListRequestValues);

  if (postIdChunks.length <= 0) return queryClient;

  await Promise.all(
    postIdChunks.map((postIdChunk) =>
      prefetchGetPostMetadatasApiQuery(queryClient, { postIds: postIdChunk }, { request: options }),
    ),
  );

  return queryClient;
};
