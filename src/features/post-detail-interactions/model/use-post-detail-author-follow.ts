'use client';

import { useQueryClient } from '@tanstack/react-query';

import { getUserFollowingsQueryKey, useFollowUser, useGetUserFollowings, useUnfollowUser } from '@/entities/user';
import { toast } from '@/shared/ui/toast';

type Params = {
  authorId?: string;
  authorName: string;
  currentUserId?: string;
  isAuthPending: boolean;
  isLoggedIn: boolean;
  onRequireLogin: () => void;
};

export const usePostDetailAuthorFollow = ({
  authorId,
  authorName,
  currentUserId,
  isAuthPending,
  isLoggedIn,
  onRequireLogin,
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
    const successMessage = isFollowingAuthor ? `${authorName}님 팔로우를 해제했어요` : `${authorName}님을 팔로우했어요`;
    const errorMessage = isFollowingAuthor ? '팔로우 취소에 실패했어요' : '팔로우에 실패했어요';

    mutation.mutate(
      { targetUserId: authorId },
      {
        onSuccess: async () => {
          await invalidateFollowingQueries();
          toast.success(successMessage);
        },
        onError: () => {
          toast.error(errorMessage);
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
