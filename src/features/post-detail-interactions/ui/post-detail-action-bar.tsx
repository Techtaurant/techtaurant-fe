'use client';

import { PostDetailPrimaryActions } from '@/features/post-detail-interactions/ui/post-detail-primary-actions';
import { PostDetailReadToggleButton } from '@/features/post-detail-interactions/ui/post-detail-read-toggle-button';
import { PostDetailShareButton } from '@/features/post-detail-interactions/ui/post-detail-share-button';

type Props = {
  commentCount: number;
  isDisliked: boolean;
  isAuthPending: boolean;
  isLoggedIn: boolean;
  isLikePending: boolean;
  isLiked: boolean;
  isRead: boolean;
  isReadPending: boolean;
  likeCount: number;
  onShare: () => void;
  onToggleDislike: () => void;
  onToggleLike: () => void;
  onToggleRead: () => void;
  viewCount: number;
};

export function PostDetailActionBar({
  commentCount,
  isDisliked,
  isAuthPending,
  isLoggedIn,
  isLikePending,
  isLiked,
  isRead,
  isReadPending,
  likeCount,
  onShare,
  onToggleDislike,
  onToggleLike,
  onToggleRead,
  viewCount,
}: Props) {
  return (
    <div className="border-border mb-3 flex items-center justify-between gap-2 border-t py-3 md:gap-3">
      <div className="scrollbar-hidden min-w-0 flex-1 overflow-x-auto">
        <PostDetailPrimaryActions
          commentCount={commentCount}
          isDisliked={isDisliked}
          isAuthPending={isAuthPending}
          isLikePending={isLikePending}
          isLiked={isLiked}
          likeCount={likeCount}
          viewCount={viewCount}
          onToggleDislike={onToggleDislike}
          onToggleLike={onToggleLike}
        />
      </div>

      <div className="flex shrink-0 items-center justify-end gap-1 md:gap-3">
        <PostDetailReadToggleButton
          isAuthPending={isAuthPending}
          isLoggedIn={isLoggedIn}
          isRead={isRead}
          isReadPending={isReadPending}
          onToggleRead={onToggleRead}
        />
        <PostDetailShareButton onShare={onShare} />
      </div>
    </div>
  );
}
