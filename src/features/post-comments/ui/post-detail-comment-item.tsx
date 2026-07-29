'use client';

import { ThumbsDown, ThumbsUp } from 'lucide-react';

import type { CommentItem } from '@/entities/comment';
import { COMMENT_LIKE_STATUS } from '@/entities/comment';
import { UserAvatar } from '@/entities/user';
import { cn } from '@/shared/lib/cn';
import { formatDisplayTime } from '@/shared/lib/format-date';

type Props = {
  comment: CommentItem;
  onDislikeComment: (comment: CommentItem) => void;
  onLikeComment: (comment: CommentItem) => void;
  postAuthorId?: string;
};

const DELETED_COMMENT_MESSAGE = '삭제된 댓글입니다.';
const BANNED_COMMENT_AUTHOR_NAME = '차단한 사용자';
const BANNED_COMMENT_CONTENT = '차단한 사용자의 댓글입니다.';

export function PostDetailCommentItem({ comment, onDislikeComment, onLikeComment, postAuthorId }: Props) {
  const isBanned = comment.isBanned;
  const isPostAuthor = postAuthorId === comment.author.id;
  const shouldShowInteractionRow = !comment.isDeleted && !isBanned;
  const authorName = isBanned ? BANNED_COMMENT_AUTHOR_NAME : comment.author.name;
  const profileImageUrl = isBanned ? '' : comment.author.profileImageUrl;

  return (
    <div className="relative flex gap-3">
      <UserAvatar name={authorName} profileImageUrl={profileImageUrl} className="z-30 h-[30px] w-[30px] shrink-0" />

      <div className="min-w-0 flex-1">
        <div className="mb-1 flex items-center justify-between gap-2">
          <div className="flex min-w-0 flex-wrap items-center gap-x-1.5 gap-y-1">
            <span className="text-foreground text-sm font-semibold">{authorName}</span>
            {isPostAuthor && (
              <span className="bg-comment-author-badge-background text-comment-author-badge-foreground inline-flex items-center rounded-full px-2 py-0.5 text-[11px] leading-4 font-semibold">
                작성자
              </span>
            )}
            <span className="text-muted-foreground text-xs">{formatDisplayTime(comment.createdAt)}</span>
          </div>
        </div>

        <p className="text-foreground mb-2 text-sm leading-relaxed break-words whitespace-pre-wrap">
          {comment.isDeleted ? DELETED_COMMENT_MESSAGE : isBanned ? BANNED_COMMENT_CONTENT : comment.content}
        </p>

        {shouldShowInteractionRow && (
          <div className="flex items-center gap-4">
            <div className="text-muted-foreground inline-flex items-center gap-1 text-xs">
              <button
                type="button"
                aria-pressed={comment.likeStatus === COMMENT_LIKE_STATUS.LIKE}
                className={cn(
                  'hover:text-foreground rounded-full p-1 transition-colors',
                  comment.likeStatus === COMMENT_LIKE_STATUS.LIKE &&
                    'text-button-danger-surface hover:text-button-danger-surface',
                )}
                onClick={() => onLikeComment(comment)}
              >
                <ThumbsUp className="h-3.5 w-3.5" />
              </button>
              <span className="px-0.5 text-[11px] font-semibold">{comment.likeCount}</span>
              <button
                type="button"
                aria-pressed={comment.likeStatus === COMMENT_LIKE_STATUS.DISLIKE}
                className={cn(
                  'hover:text-foreground rounded-full p-1 transition-colors',
                  comment.likeStatus === COMMENT_LIKE_STATUS.DISLIKE &&
                    'text-button-primary-surface hover:text-button-primary-surface',
                )}
                onClick={() => onDislikeComment(comment)}
              >
                <ThumbsDown className="h-3.5 w-3.5" />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
