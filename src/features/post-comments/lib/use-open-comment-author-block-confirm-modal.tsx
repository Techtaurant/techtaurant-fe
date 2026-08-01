'use client';

import { overlay } from 'overlay-kit';

import type { CommentItem } from '@/entities/comment';
import { PostDetailCommentAuthorBlockConfirmModal } from '@/features/post-comments/ui/post-detail-comment-author-block-confirm-modal';

type Params = {
  postId: string;
};

export const useOpenCommentAuthorBlockConfirmModal = ({ postId }: Params) => {
  const openCommentAuthorBlockConfirmModal = (comment: CommentItem) => {
    overlay.open(({ overlayId, isOpen, unmount }) => (
      <PostDetailCommentAuthorBlockConfirmModal
        authorName={comment.author.name}
        overlayId={overlayId}
        isOpen={isOpen}
        onClose={unmount}
        postId={postId}
        targetUserId={comment.author.id}
      />
    ));
  };

  return openCommentAuthorBlockConfirmModal;
};
