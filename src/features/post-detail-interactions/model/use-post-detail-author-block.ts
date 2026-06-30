'use client';

import { useQueryClient } from '@tanstack/react-query';

import { getPostDetailViewerStateQueryKey } from '@/entities/post-detail';
import { getPostListQueryKey } from '@/entities/post-list';
import { getMyBannedUsersQueryKey, getUserFollowingsQueryKey, useBanUser } from '@/entities/user';

type Params = {
  authorId?: string;
  currentUserId?: string;
  isOwnAuthor: boolean;
  postId: string;
};

export const usePostDetailAuthorBlock = ({ authorId, currentUserId, isOwnAuthor, postId }: Params) => {
  const queryClient = useQueryClient();
  const banMutation = useBanUser();

  const blockAuthor = async () => {
    if (!authorId || !currentUserId || isOwnAuthor) return false;

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
