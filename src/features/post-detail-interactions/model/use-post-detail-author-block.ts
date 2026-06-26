'use client';

import { useQueryClient } from '@tanstack/react-query';

import { getPostDetailViewerStateQueryKey } from '@/entities/post-detail';
import { getPostListQueryKey } from '@/entities/post-list';
import { getMyBannedUsersQueryKey, getUserFollowingsQueryKey, useBanUser } from '@/entities/user';

type Params = {
  authorId?: string;
  currentUserId?: string;
  isAuthPending: boolean;
  isLoggedIn: boolean;
  isOwnAuthor: boolean;
  onRequireLogin: () => void;
  postId: string;
};

export const usePostDetailAuthorBlock = ({
  authorId,
  currentUserId,
  isAuthPending,
  isLoggedIn,
  isOwnAuthor,
  onRequireLogin,
  postId,
}: Params) => {
  const queryClient = useQueryClient();
  const banMutation = useBanUser();

  const blockAuthor = async () => {
    if (isAuthPending) return false;
    if (!authorId || isOwnAuthor) return false;

    if (!isLoggedIn || !currentUserId) {
      onRequireLogin();
      return false;
    }

    await banMutation.mutateAsync({ targetUserId: authorId });

    await Promise.all([
      queryClient.invalidateQueries({ queryKey: getMyBannedUsersQueryKey() }),
      queryClient.invalidateQueries({ queryKey: getUserFollowingsQueryKey(currentUserId) }),
      queryClient.invalidateQueries({ queryKey: getPostListQueryKey() }),
      queryClient.invalidateQueries({ queryKey: getPostDetailViewerStateQueryKey(postId) }),
    ]);

    return true;
  };

  return {
    blockAuthor,
    isAuthorBlockPending: banMutation.isPending,
  };
};
