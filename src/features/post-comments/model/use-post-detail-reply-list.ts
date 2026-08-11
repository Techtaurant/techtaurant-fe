'use client';

import type { CommentSort } from '@/entities/comment';
import { useGetReplyCommentContents, useMergedComments } from '@/entities/comment';
import { useGetMe } from '@/entities/user';

type Params = {
  commentsSort: CommentSort;
  parentCommentId: string;
};

export const usePostDetailReplyList = ({ commentsSort, parentCommentId }: Params) => {
  const { data: me, isPending: isAuthPending } = useGetMe();
  const repliesQuery = useGetReplyCommentContents({
    commentId: parentCommentId,
    sort: commentsSort,
  });

  const isLoggedIn = !!me;
  const replyContents = repliesQuery.data ?? [];
  const mergedReplies = useMergedComments({
    contents: replyContents,
    isViewerStateEnabled: isLoggedIn && !isAuthPending,
  });
  const isMergedRepliesPending = isAuthPending || mergedReplies.isPending;
  const replies = isMergedRepliesPending ? [] : mergedReplies.data;

  const handleLoadMoreReplies = () => {
    if (!repliesQuery.hasNextPage || repliesQuery.isFetchingNextPage) return;

    void repliesQuery.fetchNextPage();
  };

  return {
    handleLoadMoreReplies,
    isRepliesError: repliesQuery.isError,
    isRepliesLoading: repliesQuery.isPending || isMergedRepliesPending,
    isRepliesLoadingMore: repliesQuery.isFetchingNextPage,
    replies,
    repliesHasNext: !!repliesQuery.hasNextPage,
  };
};
