'use client';

import type { CommentSort } from '@/entities/comment';
import { COMMENT_SORT } from '@/entities/comment';
import { usePostDetailCommentList } from '@/features/post-comments/model/use-post-detail-comment-list';
import { PostDetailCommentComposer } from '@/features/post-comments/ui/post-detail-comment-composer';
import { PostDetailCommentItem } from '@/features/post-comments/ui/post-detail-comment-item';
import { cn } from '@/shared/lib/cn';

type Props = {
  commentCount: number;
  focusRequestKey: number;
  onRequireLogin: () => void;
  postAuthorId: string;
  postId: string;
};

const EMPTY_COMMENT_LIST_MESSAGE = '아직 댓글이 없습니다. 첫 번째 댓글을 작성해보세요.';
const LOAD_MORE_COMMENTS_LABEL = '댓글 더보기';
const LOAD_MORE_LOADING_LABEL = '불러오는 중';

const COMMENT_SORT_OPTIONS = [
  { label: '최신순', value: COMMENT_SORT.LATEST },
  { label: '좋아요순', value: COMMENT_SORT.LIKE },
  { label: '답글순', value: COMMENT_SORT.REPLY },
] satisfies { label: string; value: CommentSort }[];

export function PostDetailCommentsSection({
  commentCount,
  focusRequestKey,
  onRequireLogin,
  postAuthorId,
  postId,
}: Props) {
  const commentList = usePostDetailCommentList({ postId });
  const hasComments = commentList.comments.length > 0;
  const hasKnownComments = commentCount > 0 || hasComments;
  const shouldShowEmptyCommentList = !commentList.isCommentsLoading && !hasKnownComments;

  const handleCommentLikeButtonClick = () => {
    // TODO: 댓글 좋아요 API 연동은 다음 PR에서 useCommentReaction으로 연결
  };

  const handleCommentDislikeButtonClick = () => {
    // TODO: 댓글 싫어요 API 연동은 다음 PR에서 useCommentReaction으로 연결
  };

  return (
    <section>
      <PostDetailCommentComposer focusRequestKey={focusRequestKey} postId={postId} onRequireLogin={onRequireLogin} />

      <div className="flex flex-col gap-6">
        <div className="flex items-center gap-2">
          {COMMENT_SORT_OPTIONS.map((option) => (
            <button
              key={option.value}
              type="button"
              className={cn(
                'rounded-md px-3 py-1.5 text-xs font-semibold transition-colors duration-200',
                commentList.commentsSort === option.value
                  ? 'bg-primary text-primary-foreground'
                  : 'bg-comment-sort-button text-comment-sort-button-foreground hover:bg-comment-sort-button-hover hover:text-foreground',
              )}
              onClick={() => commentList.handleCommentsSortChange(option.value)}
            >
              {option.label}
            </button>
          ))}
        </div>

        <div className="flex min-h-[5.5rem] flex-col gap-6">
          {hasComments &&
            commentList.comments.map((comment) => (
              <PostDetailCommentItem
                key={comment.id}
                comment={comment}
                postAuthorId={postAuthorId}
                onDislikeComment={handleCommentDislikeButtonClick}
                onLikeComment={handleCommentLikeButtonClick}
              />
            ))}

          {shouldShowEmptyCommentList && (
            <p className="text-muted-foreground py-8 text-center">{EMPTY_COMMENT_LIST_MESSAGE}</p>
          )}
        </div>

        {commentList.commentsHasNext && (
          <div className="flex justify-center pt-2">
            <button
              type="button"
              disabled={commentList.isCommentsLoadingMore}
              className="border-border text-muted-foreground hover:text-foreground hover:bg-muted/85 rounded-full border px-5 py-2.5 text-sm font-medium transition-colors duration-200 disabled:cursor-not-allowed disabled:opacity-60"
              onClick={commentList.handleLoadMoreComments}
            >
              {commentList.isCommentsLoadingMore ? LOAD_MORE_LOADING_LABEL : LOAD_MORE_COMMENTS_LABEL}
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
