'use client';

import { useQueryClient } from '@tanstack/react-query';
import { useState } from 'react';

import type { CommentItem, CommentLikeStatus } from '@/entities/comment';
import {
  COMMENT_LIKE_STATUS,
  getCommentMetadatasQueryKey,
  getCommentViewerStatesQueryKey,
  useUpdateCommentLikeStatus,
} from '@/entities/comment';
import { useGetMe } from '@/entities/user';
import { toast } from '@/shared/ui/toast';

type Params = {
  onRequireLogin: () => void;
};

const COMMENT_REACTION_FAILED_MESSAGE = '댓글 반응 업데이트에 실패했습니다.';

export const useCommentReaction = ({ onRequireLogin }: Params) => {
  const [updatingCommentIds, setUpdatingCommentIds] = useState(() => new Set<string>());
  const queryClient = useQueryClient();
  const { data: me, isPending: isAuthPending } = useGetMe();
  const isLoggedIn = !!me;
  const commentLikeMutation = useUpdateCommentLikeStatus();

  const ensureLoggedIn = () => {
    if (isAuthPending) return false;
    if (isLoggedIn) return true;

    onRequireLogin();
    return false;
  };

  const invalidateCommentReactionQueries = async () => {
    await Promise.all([
      queryClient.invalidateQueries({ queryKey: getCommentMetadatasQueryKey() }),
      queryClient.invalidateQueries({ queryKey: getCommentViewerStatesQueryKey() }),
    ]);
  };

  const handleCommentReaction = async (comment: CommentItem, targetLikeStatus: CommentLikeStatus) => {
    if (!ensureLoggedIn()) return;
    if (updatingCommentIds.has(comment.id)) return;

    const nextLikeStatus = getNextCommentLikeStatus({
      currentLikeStatus: comment.likeStatus,
      targetLikeStatus,
    });

    setUpdatingCommentIds((currentIds) => new Set(currentIds).add(comment.id));

    try {
      await commentLikeMutation.mutateAsync({
        commentId: comment.id,
        data: {
          likeStatus: nextLikeStatus,
        },
      });
      await invalidateCommentReactionQueries();
    } catch {
      toast.error(COMMENT_REACTION_FAILED_MESSAGE);
    } finally {
      setUpdatingCommentIds((currentIds) => {
        const nextIds = new Set(currentIds);
        nextIds.delete(comment.id);
        return nextIds;
      });
    }
  };

  const handleLikeComment = (comment: CommentItem) => {
    void handleCommentReaction(comment, COMMENT_LIKE_STATUS.LIKE);
  };

  const handleDislikeComment = (comment: CommentItem) => {
    void handleCommentReaction(comment, COMMENT_LIKE_STATUS.DISLIKE);
  };

  const isCommentReactionUpdating = (commentId: string) => {
    return updatingCommentIds.has(commentId);
  };

  return {
    handleDislikeComment,
    handleLikeComment,
    isCommentReactionUpdating,
  };
};

const getNextCommentLikeStatus = ({
  currentLikeStatus,
  targetLikeStatus,
}: {
  currentLikeStatus: CommentLikeStatus;
  targetLikeStatus: CommentLikeStatus;
}) => {
  if (currentLikeStatus === targetLikeStatus) return COMMENT_LIKE_STATUS.NONE;

  return targetLikeStatus;
};
