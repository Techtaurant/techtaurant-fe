import type { QueryClient } from '@tanstack/react-query';
import { useQueries } from '@tanstack/react-query';

import { POST_LIST_REQUEST_BATCH_SIZE } from '@/entities/post-list/config/constants';
import { getGetPostMetadatasApiQueryOptions, prefetchGetPostMetadatasApiQuery } from '@/shared/api/generated';
import { chunkArray } from '@/shared/lib/chunk-array';

type Params = {
  options?: RequestInit;
  postIds: string[];
};

export const useGetPostListMetadatas = ({ options, postIds }: Params) => {
  const postIdChunks = chunkArray(postIds, POST_LIST_REQUEST_BATCH_SIZE);
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

export const prefetchGetPostListMetadatas = async (queryClient: QueryClient, { options, postIds }: Params) => {
  const postIdChunks = chunkArray(postIds, POST_LIST_REQUEST_BATCH_SIZE);

  if (postIdChunks.length <= 0) return queryClient;

  await Promise.all(
    postIdChunks.map((postIdChunk) =>
      prefetchGetPostMetadatasApiQuery(queryClient, { postIds: postIdChunk }, { request: options }),
    ),
  );

  return queryClient;
};
