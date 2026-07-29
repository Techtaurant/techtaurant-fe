'use client';

import { useQueryClient } from '@tanstack/react-query';

import { getPostDetailViewerStateQueryKey } from '@/entities/post-detail';
import { getPostListQueryKey } from '@/entities/post-list';
import { getMyBannedUsersQueryKey, getUserFollowingsQueryKey, useBanUser, useGetMe } from '@/entities/user';

type Params = {
  postId: string;
  authorId?: string;
  onSuccess?: () => void;
  onError?: () => void;
};

export const usePostDetailAuthorBlock = ({ postId, authorId, onSuccess, onError }: Params) => {
  const queryClient = useQueryClient();
  const { data: me } = useGetMe();
  const banMutation = useBanUser();
  const currentUserId = me?.id;

  const blockAuthor = () => {
    if (!authorId || !currentUserId || authorId === currentUserId) return;

    banMutation.mutate(
      { targetUserId: authorId },
      {
        onSuccess: async () => {
          await Promise.all([
            queryClient.invalidateQueries({ queryKey: getMyBannedUsersQueryKey() }),
            queryClient.invalidateQueries({ queryKey: getUserFollowingsQueryKey(currentUserId) }),
            queryClient.invalidateQueries({ queryKey: getPostListQueryKey() }),
            queryClient.invalidateQueries({ queryKey: getPostDetailViewerStateQueryKey(postId) }),
          ]);
          onSuccess?.();
        },
        onError: () => {
          onError?.();
        },
      },
    );
  };

  return {
    blockAuthor,
    isAuthorBlockPending: banMutation.isPending,
  };
};
