'use client';

import { useQueryClient } from '@tanstack/react-query';

import { getUserFollowingsQueryKey, useFollowUser, useGetUserFollowings, useUnfollowUser } from '@/entities/user';

type Params = {
  authorId?: string;
  currentUserId?: string;
  isAuthPending: boolean;
  isLoggedIn: boolean;
  onError?: (nextFollowingState: boolean) => void;
  onRequireLogin: () => void;
  onSuccess?: (nextFollowingState: boolean) => void;
};

export const usePostDetailAuthorFollow = ({
  authorId,
  currentUserId,
  isAuthPending,
  isLoggedIn,
  onError,
  onRequireLogin,
  onSuccess,
}: Params) => {
  const queryClient = useQueryClient();
  const followMutation = useFollowUser();
  const unfollowMutation = useUnfollowUser();
  const followingsQuery = useGetUserFollowings({
    enabled: Boolean(currentUserId && authorId),
    userId: currentUserId,
  });

  const isOwnAuthor = Boolean(currentUserId && authorId && currentUserId === authorId);
  const isFollowingAuthor = Boolean(
    authorId && followingsQuery.data?.some((followingUser) => followingUser.userId === authorId),
  );
  const isFollowingUpdating = followMutation.isPending || unfollowMutation.isPending || followingsQuery.isFetching;

  const invalidateFollowingQueries = async () => {
    if (!currentUserId) return;
    await queryClient.invalidateQueries({ queryKey: getUserFollowingsQueryKey(currentUserId) });
  };

  const toggleAuthorFollow = () => {
    if (isAuthPending) return;
    if (!authorId || isOwnAuthor) return;

    if (!isLoggedIn || !currentUserId) {
      onRequireLogin();
      return;
    }

    const mutation = isFollowingAuthor ? unfollowMutation : followMutation;
    const nextFollowingState = !isFollowingAuthor;

    mutation.mutate(
      { targetUserId: authorId },
      {
        onSuccess: async () => {
          await invalidateFollowingQueries();
          onSuccess?.(nextFollowingState);
        },
        onError: () => {
          onError?.(nextFollowingState);
        },
      },
    );
  };

  return {
    isFollowingAuthor,
    isFollowingUpdating,
    isOwnAuthor,
    toggleAuthorFollow,
  };
};
