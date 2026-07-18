'use client';

import { useQueryClient } from '@tanstack/react-query';

import {
  getPostDetailMetadataQueryKey,
  getPostDetailViewerStateQueryKey,
  useUpdatePostReadStatus,
} from '@/entities/post-detail';
import { getPostListQueryKey } from '@/entities/post-list';

type Params = {
  postId: string;
  isAuthPending: boolean;
  isLoggedIn: boolean;
  isRead: boolean;
  onError?: () => void;
  onRequireLogin: () => void;
  onSuccess?: (nextReadState: boolean) => void;
};

export const usePostDetailReadToggle = ({
  postId,
  isAuthPending,
  isLoggedIn,
  isRead,
  onError,
  onRequireLogin,
  onSuccess,
}: Params) => {
  const queryClient = useQueryClient();
  const readMutation = useUpdatePostReadStatus();

  const toggleRead = () => {
    if (isAuthPending) return;

    if (!isLoggedIn) {
      onRequireLogin();
      return;
    }

    const nextReadState = !isRead;

    readMutation.mutate(
      {
        postId,
        data: {
          isRead: nextReadState,
        },
      },
      {
        onSuccess: async () => {
          await Promise.all([
            queryClient.invalidateQueries({ queryKey: getPostDetailMetadataQueryKey(postId) }),
            queryClient.invalidateQueries({ queryKey: getPostDetailViewerStateQueryKey(postId) }),
            queryClient.invalidateQueries({ queryKey: getPostListQueryKey() }),
          ]);
          onSuccess?.(nextReadState);
        },
        onError: () => {
          onError?.();
        },
      },
    );
  };

  return {
    isReadPending: readMutation.isPending,
    toggleRead,
  };
};
