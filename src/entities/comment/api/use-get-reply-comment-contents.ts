import { keepPreviousData, useInfiniteQuery } from '@tanstack/react-query';

import { getCommentsQueryKey } from '@/entities/comment/api/use-get-parent-comment-contents';
import { DEFAULT_COMMENT_LIST_SIZE } from '@/entities/comment/config/constants';
import type { CommentSort } from '@/entities/comment/model/comment';
import { COMMENT_SORT } from '@/entities/comment/model/comment';
import type { CommentContentListResponse, GetReplyContentsApiParams } from '@/shared/api/generated';
import { getReplyContentsApi } from '@/shared/api/generated';

type Params = {
  commentId: string;
  options?: RequestInit;
  sort?: CommentSort;
};

const toReplyCommentContentsParams = (sort?: CommentSort) => {
  return {
    size: DEFAULT_COMMENT_LIST_SIZE,
    sort: sort ?? COMMENT_SORT.LATEST,
  } satisfies GetReplyContentsApiParams;
};

export const getReplyCommentContentsQueryKey = ({ commentId, sort }: Pick<Params, 'commentId' | 'sort'>) => {
  return [
    ...getCommentsQueryKey(),
    'replies',
    { commentId, size: DEFAULT_COMMENT_LIST_SIZE, sort: sort ?? COMMENT_SORT.LATEST },
  ] as const;
};

export const useGetReplyCommentContents = ({ commentId, options, sort }: Params) => {
  const params = toReplyCommentContentsParams(sort);

  return useInfiniteQuery<
    Awaited<ReturnType<typeof getReplyContentsApi>>,
    Error,
    CommentContentListResponse[],
    ReturnType<typeof getReplyCommentContentsQueryKey>,
    string | undefined
  >({
    enabled: !!commentId,
    getNextPageParam: (lastPage) => lastPage.data?.nextCursor ?? undefined,
    initialPageParam: undefined as string | undefined,
    placeholderData: keepPreviousData,
    queryFn: ({ pageParam, signal }) =>
      getReplyContentsApi(
        commentId,
        {
          ...params,
          cursor: pageParam,
        },
        { signal, ...options },
      ),
    queryKey: getReplyCommentContentsQueryKey({ commentId, sort }),
    select: (data) => data.pages.flatMap((page) => page.data?.content ?? []),
  });
};
