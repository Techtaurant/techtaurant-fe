'use client';

import { useQueryClient } from '@tanstack/react-query';
import { useState } from 'react';

import {
  getCommentMetadatasQueryKey,
  getCommentsQueryKey,
  getCommentViewerStatesQueryKey,
  useCreateComment,
} from '@/entities/comment';
import { getPostDetailMetadataQueryKey } from '@/entities/post-detail';
import { getPostListQueryKey } from '@/entities/post-list';
import { useGetMe } from '@/entities/user';
import type { CreateCommentRequest } from '@/shared/api/generated';
import { toast } from '@/shared/ui/toast';

type Params = {
  onRequireLogin: () => void;
};

const COMMENT_CONTENT_REQUIRED_MESSAGE = '댓글 내용을 입력해주세요.';
const COMMENT_CREATE_FAILED_MESSAGE = '댓글 작성에 실패했습니다.';

export const useCreatePostDetailComment = ({ onRequireLogin }: Params) => {
  const [createCommentErrorMessage, setCreateCommentErrorMessage] = useState<string | null>(null);
  const [isCommentCreating, setIsCommentCreating] = useState(false);
  const queryClient = useQueryClient();

  const { data: me, isPending: isAuthPending } = useGetMe();
  const createCommentMutation = useCreateComment();
  const isLoggedIn = !!me;

  const ensureLoggedIn = () => {
    if (isAuthPending) return false;
    if (isLoggedIn) return true;

    onRequireLogin();
    return false;
  };

  const createComment = async ({ content, parentId, postId }: CreateCommentRequest) => {
    if (!ensureLoggedIn()) return false;
    if (isCommentCreating) return false;

    const trimmedContent = content.trim();
    if (!trimmedContent) {
      setCreateCommentErrorMessage(COMMENT_CONTENT_REQUIRED_MESSAGE);
      return false;
    }

    setCreateCommentErrorMessage(null);
    setIsCommentCreating(true);

    try {
      await createCommentMutation.mutateAsync({
        data: {
          content: trimmedContent,
          postId,
          ...(parentId && { parentId }),
        },
      });
      await Promise.all([
        queryClient.invalidateQueries({ queryKey: getCommentsQueryKey() }),
        queryClient.invalidateQueries({ queryKey: getCommentMetadatasQueryKey() }),
        queryClient.invalidateQueries({ queryKey: getCommentViewerStatesQueryKey() }),
        queryClient.invalidateQueries({ queryKey: getPostDetailMetadataQueryKey(postId) }),
        queryClient.invalidateQueries({ queryKey: getPostListQueryKey() }),
      ]);
      return true;
    } catch {
      setCreateCommentErrorMessage(COMMENT_CREATE_FAILED_MESSAGE);
      toast.error(COMMENT_CREATE_FAILED_MESSAGE);
      return false;
    } finally {
      setIsCommentCreating(false);
    }
  };

  const clearCreateCommentError = () => {
    setCreateCommentErrorMessage(null);
  };

  return {
    clearCreateCommentError,
    createComment,
    createCommentErrorMessage,
    isCommentCreating,
  };
};
