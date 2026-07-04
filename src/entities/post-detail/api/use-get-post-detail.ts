import type { QueryClient } from '@tanstack/react-query';

import {
  getGetPostContentDetailApiQueryKey,
  getGetPostContentDetailApiQueryOptions,
  useGetPostContentDetailApi,
} from '@/shared/api/generated';

type Params = {
  options?: RequestInit;
  postId: string;
};

const getPostDetailQueryKey = (postId: string) => {
  return getGetPostContentDetailApiQueryKey(postId);
};

export const useGetPostDetail = ({ options, postId }: Params) => {
  return useGetPostContentDetailApi(postId, {
    request: options,
    query: {
      queryKey: getPostDetailQueryKey(postId),
      select: (response) => response.data,
    },
  });
};

export const fetchPostDetail = async (queryClient: QueryClient, { options, postId }: Params) => {
  try {
    const response = await queryClient.fetchQuery(
      getGetPostContentDetailApiQueryOptions(postId, {
        request: options,
        query: {
          queryKey: getPostDetailQueryKey(postId),
        },
      }),
    );

    return response.data ?? null;
  } catch {
    return null;
  }
};
