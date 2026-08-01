'use client';

import { useState } from 'react';

import type { CommentSort } from '@/entities/comment';
import { COMMENT_SORT, useGetParentCommentContents, useMergedComments } from '@/entities/comment';
import { useGetMe } from '@/entities/user';

type Params = {
  postId: string;
};

export const usePostDetailCommentList = ({ postId }: Params) => {
  const [commentsSort, setCommentsSort] = useState<CommentSort>(COMMENT_SORT.LATEST);
  const { data: me, isPending: isAuthPending } = useGetMe();
  const isLoggedIn = !!me;

  const parentCommentsQuery = useGetParentCommentContents({
    postId,
    sort: commentsSort,
  });
  const commentContents = parentCommentsQuery.data ?? [];
  const mergedComments = useMergedComments({
    contents: commentContents,
    isViewerStateEnabled: isLoggedIn && !isAuthPending,
  });
  const isMergedCommentsPending = isAuthPending || mergedComments.isPending;
  const comments = isMergedCommentsPending ? [] : mergedComments.data;

  const handleLoadMoreComments = async () => {
    if (!parentCommentsQuery.hasNextPage || parentCommentsQuery.isFetchingNextPage) return;

    await parentCommentsQuery.fetchNextPage();
  };

  const handleCommentsSortChange = (sort: CommentSort) => {
    setCommentsSort(sort);
  };

  return {
    comments,
    commentsHasNext: !!parentCommentsQuery.hasNextPage,
    commentsSort,
    handleCommentsSortChange,
    handleLoadMoreComments,
    isCommentsLoading: parentCommentsQuery.isPending || isMergedCommentsPending,
    isCommentsLoadingMore: parentCommentsQuery.isFetchingNextPage,
  };
};
