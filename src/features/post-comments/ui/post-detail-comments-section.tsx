'use client';

import type { SyntheticEvent } from 'react';
import { useEffect, useRef, useState } from 'react';

import type { CommentSort } from '@/entities/comment';
import { COMMENT_SORT } from '@/entities/comment';
import {
  COMMENT_FOCUS_DELAY_MS,
  COMMENT_TEXTAREA_COLLAPSED_HEIGHT,
  COMMENT_TEXTAREA_EXPANDED_HEIGHT,
} from '@/features/post-comments/config/comment-composer';
import { usePostDetailComments } from '@/features/post-comments/model/use-post-detail-comments';
import { PostDetailCommentComposer } from '@/features/post-comments/ui/post-detail-comment-composer';
import { PostDetailCommentItem } from '@/features/post-comments/ui/post-detail-comment-item';
import { cn } from '@/shared/lib/cn';

type Props = {
  commentCount: number;
  focusRequestKey: number;
  onRequireLogin: () => void;
  postAuthorId?: string;
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
  const commentTextareaRef = useRef<HTMLTextAreaElement | null>(null);
  const [isCommentExpanded, setIsCommentExpanded] = useState(false);
  const [commentValue, setCommentValue] = useState('');
  const postDetailComments = usePostDetailComments({
    onRequireLogin,
    postId,
  });
  const hasComments = postDetailComments.comments.length > 0;
  const hasKnownComments = commentCount > 0 || hasComments;
  const shouldShowEmptyCommentList = !postDetailComments.isCommentsLoading && !hasKnownComments;

  const resetCommentForm = () => {
    setCommentValue('');
    setIsCommentExpanded(false);

    if (commentTextareaRef.current) {
      commentTextareaRef.current.style.height = COMMENT_TEXTAREA_COLLAPSED_HEIGHT;
    }
  };

  const handleCommentTextareaInput = (event: SyntheticEvent<HTMLTextAreaElement>) => {
    const textarea = event.currentTarget;
    textarea.style.height = 'auto';
    textarea.style.height = `${textarea.scrollHeight}px`;
  };

  const handleSubmitButtonClick = async () => {
    const isCreated = await postDetailComments.handleCreateComment(commentValue);
    if (isCreated) {
      resetCommentForm();
    }
  };

  const handleCommentValueChange = (nextCommentValue: string) => {
    setCommentValue(nextCommentValue);
    if (!postDetailComments.createCommentErrorMessage) return;

    postDetailComments.clearCreateCommentError();
  };

  const handleCommentTextareaFocus = () => {
    setIsCommentExpanded(true);
    if (!commentTextareaRef.current || commentValue) return;

    commentTextareaRef.current.style.height = COMMENT_TEXTAREA_EXPANDED_HEIGHT;
  };

  const handleCommentSubmitButtonClick = () => {
    void handleSubmitButtonClick();
  };

  const handleCommentLikeButtonClick = () => {
    // TODO: 댓글 좋아요 API 연동은 다음 PR에서 useCommentReaction으로 연결
  };

  const handleCommentDislikeButtonClick = () => {
    // TODO: 댓글 싫어요 API 연동은 다음 PR에서 useCommentReaction으로 연결
  };

  useEffect(() => {
    if (focusRequestKey <= 0) return;

    commentTextareaRef.current?.scrollIntoView({
      behavior: 'smooth',
      block: 'center',
    });
    const timeoutId = setTimeout(() => {
      setIsCommentExpanded(true);
      commentTextareaRef.current?.focus();
    }, COMMENT_FOCUS_DELAY_MS);

    return () => clearTimeout(timeoutId);
  }, [focusRequestKey]);

  return (
    <section>
      <PostDetailCommentComposer
        commentTextareaRef={commentTextareaRef}
        createCommentErrorMessage={postDetailComments.createCommentErrorMessage}
        isCommentCreating={postDetailComments.isCommentCreating}
        isCommentExpanded={isCommentExpanded}
        value={commentValue}
        onCancelButtonClick={resetCommentForm}
        onChange={handleCommentValueChange}
        onFocus={handleCommentTextareaFocus}
        onInput={handleCommentTextareaInput}
        onSubmitButtonClick={handleCommentSubmitButtonClick}
      />

      <div className="flex flex-col gap-6">
        <div className="flex items-center gap-2">
          {COMMENT_SORT_OPTIONS.map((option) => (
            <button
              key={option.value}
              type="button"
              className={cn(
                'rounded-md px-3 py-1.5 text-xs font-semibold transition-colors duration-200',
                postDetailComments.commentsSort === option.value
                  ? 'bg-primary text-primary-foreground'
                  : 'bg-comment-sort-button text-comment-sort-button-foreground hover:bg-comment-sort-button-hover hover:text-foreground',
              )}
              onClick={() => postDetailComments.handleCommentsSortChange(option.value)}
            >
              {option.label}
            </button>
          ))}
        </div>

        <div className="flex min-h-[5.5rem] flex-col gap-6">
          {hasComments &&
            postDetailComments.comments.map((comment) => (
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

        {postDetailComments.commentsHasNext && (
          <div className="flex justify-center pt-2">
            <button
              type="button"
              disabled={postDetailComments.isCommentsLoadingMore}
              className="border-border text-muted-foreground hover:text-foreground hover:bg-muted/85 rounded-full border px-5 py-2.5 text-sm font-medium transition-colors duration-200 disabled:cursor-not-allowed disabled:opacity-60"
              onClick={postDetailComments.handleLoadMoreComments}
            >
              {postDetailComments.isCommentsLoadingMore ? LOAD_MORE_LOADING_LABEL : LOAD_MORE_COMMENTS_LABEL}
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
