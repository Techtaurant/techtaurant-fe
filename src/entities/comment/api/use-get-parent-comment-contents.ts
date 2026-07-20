import { keepPreviousData, useInfiniteQuery } from '@tanstack/react-query';

import { DEFAULT_COMMENT_LIST_SIZE } from '@/entities/comment/config/constants';
import type { CommentSort } from '@/entities/comment/model/comment';
import { COMMENT_SORT } from '@/entities/comment/model/comment';
import type { CommentContentListResponse, GetParentCommentContentsApiParams } from '@/shared/api/generated';
import { getParentCommentContentsApi } from '@/shared/api/generated';

type Params = {
  options?: RequestInit;
  postId: string;
  sort?: CommentSort;
};

const toParentCommentContentsParams = (sort?: CommentSort) => {
  return {
    size: DEFAULT_COMMENT_LIST_SIZE,
    sort: sort ?? COMMENT_SORT.LATEST,
  } satisfies GetParentCommentContentsApiParams;
};

export const getCommentsQueryKey = () => {
  return ['comments'] as const;
};

export const getParentCommentContentsQueryKey = ({ postId, sort }: Pick<Params, 'postId' | 'sort'>) => {
  return [
    ...getCommentsQueryKey(),
    'parents',
    { postId, size: DEFAULT_COMMENT_LIST_SIZE, sort: sort ?? COMMENT_SORT.LATEST },
  ] as const;
};

export const useGetParentCommentContents = ({ options, postId, sort }: Params) => {
  const params = toParentCommentContentsParams(sort);

  return useInfiniteQuery<
    Awaited<ReturnType<typeof getParentCommentContentsApi>>,
    Error,
    CommentContentListResponse[],
    ReturnType<typeof getParentCommentContentsQueryKey>,
    string | undefined
  >({
    enabled: !!postId,
    getNextPageParam: (lastPage) => lastPage.data?.nextCursor ?? undefined,
    initialPageParam: undefined as string | undefined,
    placeholderData: keepPreviousData,
    queryFn: ({ pageParam, signal }) =>
      getParentCommentContentsApi(
        postId,
        {
          ...params,
          cursor: pageParam,
        },
        { signal, ...options },
      ),
    queryKey: getParentCommentContentsQueryKey({ postId, sort }),
    select: (data) => data.pages.flatMap((page) => page.data?.content ?? []),
  });
};
