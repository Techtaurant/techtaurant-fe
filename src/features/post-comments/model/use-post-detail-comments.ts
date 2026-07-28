'use client';

import { useQueryClient } from '@tanstack/react-query';
import { useState } from 'react';

import type { CommentSort } from '@/entities/comment';
import {
  COMMENT_SORT,
  getCommentMetadatasQueryKey,
  getCommentsQueryKey,
  getCommentViewerStatesQueryKey,
  useCreateComment,
  useGetParentCommentContents,
  useMergedComments,
} from '@/entities/comment';
import { getPostDetailMetadataQueryKey } from '@/entities/post-detail';
import { getPostListQueryKey } from '@/entities/post-list';
import { useGetMe } from '@/entities/user';
import { toast } from '@/shared/ui/toast';

type Params = {
  onRequireLogin: () => void;
  postId: string;
};

const COMMENT_CONTENT_REQUIRED_MESSAGE = '댓글 내용을 입력해주세요.';
const COMMENT_CREATE_FAILED_MESSAGE = '댓글 작성에 실패했습니다.';

export const usePostDetailComments = ({ onRequireLogin, postId }: Params) => {
  const queryClient = useQueryClient();
  const { data: me, isPending: isAuthPending } = useGetMe();
  const [commentsSort, setCommentsSort] = useState<CommentSort>(COMMENT_SORT.LATEST);
  const [createCommentErrorMessage, setCreateCommentErrorMessage] = useState<string | null>(null);
  const [focusRequestKey, setFocusRequestKey] = useState(0);
  const isLoggedIn = !!me;
  const parentCommentsQuery = useGetParentCommentContents({
    postId,
    sort: commentsSort,
  });
  const commentContents = parentCommentsQuery.data ?? [];
  const comments = useMergedComments({
    contents: commentContents,
    isViewerStateEnabled: isLoggedIn && !isAuthPending,
  });
  const createCommentMutation = useCreateComment();

  const ensureLoggedIn = () => {
    if (isAuthPending) return false;
    if (isLoggedIn) return true;

    onRequireLogin();
    return false;
  };

  const invalidateCommentQueries = async () => {
    await Promise.all([
      queryClient.invalidateQueries({ queryKey: getCommentsQueryKey() }),
      queryClient.invalidateQueries({ queryKey: getCommentMetadatasQueryKey() }),
      queryClient.invalidateQueries({ queryKey: getCommentViewerStatesQueryKey() }),
      queryClient.invalidateQueries({ queryKey: getPostDetailMetadataQueryKey(postId) }),
      queryClient.invalidateQueries({ queryKey: getPostListQueryKey() }),
    ]);
  };

  const handleLoadMoreComments = async () => {
    if (!parentCommentsQuery.hasNextPage || parentCommentsQuery.isFetchingNextPage) return;

    await parentCommentsQuery.fetchNextPage();
  };

  const handleCommentsSortChange = (sort: CommentSort) => {
    setCreateCommentErrorMessage(null);
    setCommentsSort(sort);
  };

  const handleCreateComment = async (content: string) => {
    if (!ensureLoggedIn()) return false;

    const trimmedContent = content.trim();
    if (!trimmedContent) {
      setCreateCommentErrorMessage(COMMENT_CONTENT_REQUIRED_MESSAGE);
      return false;
    }

    setCreateCommentErrorMessage(null);

    try {
      await createCommentMutation.mutateAsync({
        data: {
          content: trimmedContent,
          postId,
        },
      });
      await invalidateCommentQueries();
      return true;
    } catch {
      setCreateCommentErrorMessage(COMMENT_CREATE_FAILED_MESSAGE);
      toast.error(COMMENT_CREATE_FAILED_MESSAGE);
      return false;
    }
  };

  const clearCreateCommentError = () => {
    setCreateCommentErrorMessage(null);
  };

  const requestCommentFocus = () => {
    setFocusRequestKey((currentKey) => currentKey + 1);
  };

  return {
    clearCreateCommentError,
    comments,
    commentsHasNext: !!parentCommentsQuery.hasNextPage,
    commentsSort,
    createCommentErrorMessage,
    focusRequestKey,
    handleCommentsSortChange,
    handleCreateComment,
    handleLoadMoreComments,
    isCommentCreating: createCommentMutation.isPending,
    isCommentsLoading: parentCommentsQuery.isPending,
    isCommentsLoadingMore: parentCommentsQuery.isFetchingNextPage,
    requestCommentFocus,
  };
};
