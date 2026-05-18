import { infiniteQueryOptions } from '@tanstack/react-query';

import { getGetPostsInfiniteQueryKey, getPosts, type GetPostsParams } from '@/shared/api/generated';

type Params = {
  params?: Omit<GetPostsParams, 'cursor'>;
  options?: RequestInit;
};

// TODO: fetch orval 쓰면서 별도 queryFn 없이 사용할 수 있는 방법 찾기
const getPostListQueryFn = async (params?: GetPostsParams, options?: RequestInit) => {
  const response = await getPosts(params, options);

  if (response.status !== 200 || !response.data.data) {
    return {
      content: [],
      hasNext: false,
      nextCursor: undefined,
      size: 0,
    };
  }

  return response.data.data;
};

export const postListInfiniteQueryOptions = ({ params, options }: Params) => {
  return infiniteQueryOptions({
    queryFn: ({ pageParam }) => getPostListQueryFn({ ...params, cursor: pageParam }, options),
    initialPageParam: undefined as string | undefined,
    getNextPageParam: (lastPage) => lastPage.nextCursor ?? undefined,
    queryKey: getGetPostsInfiniteQueryKey(params),
  });
};
