'use client';

import { useQueryClient } from '@tanstack/react-query';

import { getUserFollowingsQueryKey, useFollowUser, useGetUserFollowings, useUnfollowUser } from '@/entities/user';

type AuthorFollowResult = 'followed' | 'unfollowed';

type Params = {
  authorId?: string;
  currentUserId?: string;
  isLoggedIn: boolean;
  onRequireLogin: () => void;
};

export const usePostDetailAuthorFollow = ({ authorId, currentUserId, isLoggedIn, onRequireLogin }: Params) => {
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

  const toggleAuthorFollow = async (): Promise<AuthorFollowResult | undefined> => {
    if (!authorId || isOwnAuthor) return;

    if (!isLoggedIn || !currentUserId) {
      onRequireLogin();
      return;
    }

    if (isFollowingAuthor) {
      await unfollowMutation.mutateAsync({ targetUserId: authorId });
      await queryClient.invalidateQueries({ queryKey: getUserFollowingsQueryKey(currentUserId) });
      return 'unfollowed';
    }

    await followMutation.mutateAsync({ targetUserId: authorId });
    await queryClient.invalidateQueries({ queryKey: getUserFollowingsQueryKey(currentUserId) });
    return 'followed';
  };

  return {
    isFollowingAuthor,
    isFollowingUpdating,
    isOwnAuthor,
    toggleAuthorFollow,
  };
};
