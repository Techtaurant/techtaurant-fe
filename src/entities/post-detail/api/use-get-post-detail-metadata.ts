import type { QueryClient } from '@tanstack/react-query';

import {
  getGetPostMetadatasApiQueryKey,
  prefetchGetPostMetadatasApiQuery,
  useGetPostMetadatasApi,
} from '@/shared/api/generated';

type Params = {
  options?: RequestInit;
  postId: string;
};

const toPostMetadataParams = (postId: string) => {
  return {
    postIds: [postId],
  };
};

export const getPostDetailMetadataQueryKey = (postId: string) => {
  return getGetPostMetadatasApiQueryKey(toPostMetadataParams(postId));
};

export const useGetPostDetailMetadata = ({ options, postId }: Params) => {
  return useGetPostMetadatasApi(toPostMetadataParams(postId), {
    request: options,
    query: {
      enabled: Boolean(postId),
      queryKey: getPostDetailMetadataQueryKey(postId),
      select: (response) => response.data?.[0],
    },
  });
};

export const prefetchGetPostDetailMetadata = async (queryClient: QueryClient, { options, postId }: Params) => {
  if (!postId) return;

  await prefetchGetPostMetadatasApiQuery(queryClient, toPostMetadataParams(postId), {
    request: options,
    query: {
      queryKey: getPostDetailMetadataQueryKey(postId),
    },
  });
};
