'use client';

import { useQueryClient } from '@tanstack/react-query';

import { getCommentsQueryKey, useUpdateComment } from '@/entities/comment';

type UpdateCommentParams = {
  commentId: string;
  content: string;
  onError?: () => void;
  onSuccess?: () => void;
};

export const useUpdateCommentMutation = () => {
  const queryClient = useQueryClient();
  const updateCommentMutation = useUpdateComment();

  const invalidateCommentUpdateQueries = async () => {
    await queryClient.invalidateQueries({ queryKey: getCommentsQueryKey() });
  };

  const updateComment = ({ commentId, content, onError, onSuccess }: UpdateCommentParams) => {
    updateCommentMutation.mutate(
      {
        commentId,
        data: {
          content,
        },
      },
      {
        onError: () => {
          onError?.();
        },
        onSuccess: async () => {
          await invalidateCommentUpdateQueries();
          onSuccess?.();
        },
      },
    );
  };

  return {
    isCommentUpdating: updateCommentMutation.isPending,
    updateComment,
  };
};
