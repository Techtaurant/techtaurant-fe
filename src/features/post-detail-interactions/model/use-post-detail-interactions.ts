'use client';

import { useQueryClient } from '@tanstack/react-query';

import type { PostLikeStatus } from '@/entities/post-detail';
import {
  getPostDetailMetadataQueryKey,
  getPostDetailViewerStateQueryKey,
  POST_LIKE_STATUS,
  useUpdatePostLikeStatus,
  useUpdatePostReadStatus,
} from '@/entities/post-detail';
import { getPostListQueryKey } from '@/entities/post-list';

type Params = {
  isAuthPending: boolean;
  isLoggedIn: boolean;
  isRead: boolean;
  likeStatus: PostLikeStatus;
  onRequireLogin: () => void;
  postId: string;
};

export const usePostDetailInteractions = ({
  isAuthPending,
  isLoggedIn,
  isRead,
  likeStatus,
  onRequireLogin,
  postId,
}: Params) => {
  const queryClient = useQueryClient();
  const likeMutation = useUpdatePostLikeStatus();
  const readMutation = useUpdatePostReadStatus();

  const ensureLoggedIn = () => {
    if (isAuthPending) return false;
    if (isLoggedIn) return true;

    onRequireLogin();
    return false;
  };

  const togglePostReaction = async (targetLikeStatus: PostLikeStatus) => {
    if (!ensureLoggedIn()) return;

    const nextLikeStatus = getNextLikeStatus({ currentLikeStatus: likeStatus, targetLikeStatus });

    await likeMutation.mutateAsync({
      postId,
      data: {
        likeStatus: nextLikeStatus,
      },
    });
    await Promise.all([
      queryClient.invalidateQueries({ queryKey: getPostDetailMetadataQueryKey(postId) }),
      queryClient.invalidateQueries({ queryKey: getPostDetailViewerStateQueryKey(postId) }),
      queryClient.invalidateQueries({ queryKey: getPostListQueryKey() }),
    ]);
  };

  const toggleLike = async () => {
    await togglePostReaction(POST_LIKE_STATUS.LIKE);
  };

  const toggleDislike = async () => {
    await togglePostReaction(POST_LIKE_STATUS.DISLIKE);
  };

  const toggleRead = async () => {
    if (!ensureLoggedIn()) return;

    await readMutation.mutateAsync({
      postId,
      data: {
        isRead: !isRead,
      },
    });
    await Promise.all([
      queryClient.invalidateQueries({ queryKey: getPostDetailMetadataQueryKey(postId) }),
      queryClient.invalidateQueries({ queryKey: getPostDetailViewerStateQueryKey(postId) }),
      queryClient.invalidateQueries({ queryKey: getPostListQueryKey() }),
    ]);
  };

  return {
    isLikePending: likeMutation.isPending,
    isReadPending: readMutation.isPending,
    toggleDislike,
    toggleLike,
    toggleRead,
  };
};

const getNextLikeStatus = ({
  currentLikeStatus,
  targetLikeStatus,
}: {
  currentLikeStatus: PostLikeStatus;
  targetLikeStatus: PostLikeStatus;
}) => {
  if (currentLikeStatus === targetLikeStatus) return POST_LIKE_STATUS.NONE;

  return targetLikeStatus;
};
