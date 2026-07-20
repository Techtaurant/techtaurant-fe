'use client';

import { overlay } from 'overlay-kit';

import { POST_LIKE_STATUS } from '@/entities/post-detail';
import { startGoogleLogin } from '@/features/auth';
import { PostDetailCommentsSection, usePostDetailComments } from '@/features/post-comments';
import {
  PostDetailActionBar,
  usePostDetailAuthorFollow,
  usePostDetailInteractions,
} from '@/features/post-detail-interactions';
import { toast } from '@/shared/ui/toast';
import { usePostDetailShare } from '@/views/post-detail/model/use-post-detail-share';
import { usePostDetailViewData } from '@/views/post-detail/model/use-post-detail-view-data';
import { useRecordPostViewOnce } from '@/views/post-detail/model/use-record-post-view-once';
import { PostDetailArticleHeader } from '@/views/post-detail/ui/post-detail-article-header';
import { PostDetailAuthorBlockConfirmModal } from '@/views/post-detail/ui/post-detail-author-block-confirm-modal';
import { PostDetailBlockedFallback } from '@/views/post-detail/ui/post-detail-blocked-fallback';
import { PostDetailContainer } from '@/views/post-detail/ui/post-detail-container';
import { PostDetailContent } from '@/views/post-detail/ui/post-detail-content';

type Props = {
  postId: string;
};

const UNKNOWN_AUTHOR_NAME = '알 수 없음';
const FOLLOW_ERROR_MESSAGE = '팔로우에 실패했어요';
const UNFOLLOW_ERROR_MESSAGE = '팔로우 취소에 실패했어요';

export function PostDetailView({ postId }: Props) {
  const {
    authorProfile,
    currentUserId,
    isAuthPending,
    isLoggedIn,
    isViewerStateResolved,
    metadata,
    post,
    viewerState,
  } = usePostDetailViewData(postId);
  const authorId = post?.author.id;
  const authorName = authorProfile?.authorName ?? UNKNOWN_AUTHOR_NAME;
  const likeStatus = viewerState?.likeStatus ?? POST_LIKE_STATUS.NONE;
  const isLiked = likeStatus === POST_LIKE_STATUS.LIKE;
  const isDisliked = likeStatus === POST_LIKE_STATUS.DISLIKE;
  const isAuthorBanned = viewerState?.isBanned ?? false;
  const isRead = viewerState?.isRead ?? false;
  const viewCount = metadata?.viewCount ?? 0;
  const likeCount = metadata?.likeCount ?? 0;
  const commentCount = metadata?.commentCount ?? 0;
  const { isLikePending, toggleDislike, toggleLike } = usePostDetailInteractions({
    isAuthPending,
    isLoggedIn,
    likeStatus,
    onRequireLogin: startGoogleLogin,
    postId,
  });
  const { isFollowingAuthor, isFollowingUpdating, isOwnAuthor, toggleAuthorFollow } = usePostDetailAuthorFollow({
    authorId,
    currentUserId,
    isAuthPending,
    isLoggedIn,
    onError: (nextFollowingState) => {
      toast.error(nextFollowingState ? FOLLOW_ERROR_MESSAGE : UNFOLLOW_ERROR_MESSAGE);
    },
    onRequireLogin: startGoogleLogin,
    onSuccess: (nextFollowingState) => {
      toast.success(nextFollowingState ? `${authorName}님을 팔로우했어요` : `${authorName}님 팔로우를 해제했어요`);
    },
  });
  const { sharePostDetail } = usePostDetailShare();
  const postDetailComments = usePostDetailComments({
    isAuthPending,
    isLoggedIn,
    onNotify: toast.error,
    onRequireLogin: startGoogleLogin,
    postId,
  });

  const handleCommentLikeButtonClick = () => {
    // TODO: 댓글 좋아요 API 연동은 다음 PR에서 useCommentReaction으로 연결
  };

  const handleCommentDislikeButtonClick = () => {
    // TODO: 댓글 싫어요 API 연동은 다음 PR에서 useCommentReaction으로 연결
  };

  useRecordPostViewOnce({
    enabled: !!post && isViewerStateResolved && !isAuthorBanned,
    postId,
  });

  const handleBlockAuthorButtonClick = () => {
    if (isAuthPending) return;

    if (!isLoggedIn) {
      startGoogleLogin();
      return;
    }

    overlay.open(({ overlayId, isOpen, unmount }) => (
      <PostDetailAuthorBlockConfirmModal
        authorId={authorId}
        authorName={authorProfile?.authorName}
        currentUserId={currentUserId}
        overlayId={overlayId}
        isOpen={isOpen}
        onClose={unmount}
        postId={postId}
      />
    ));
  };

  if (!post) {
    return null;
  }

  if (isAuthorBanned) {
    return <PostDetailBlockedFallback />;
  }

  const profileImageUrl = authorProfile?.profileImageUrl ?? '';

  return (
    <PostDetailContainer>
      <article>
        <PostDetailArticleHeader
          authorName={authorName}
          categoryName={post.category?.name}
          createdAt={post.createdAt}
          isAuthPending={isAuthPending}
          isFollowingAuthor={isFollowingAuthor}
          isFollowingUpdating={isFollowingUpdating}
          isOwnAuthor={isOwnAuthor}
          profileImageUrl={profileImageUrl}
          tags={post.tags}
          title={post.title}
          updatedAt={post.updatedAt}
          onRequestBlockAuthor={handleBlockAuthorButtonClick}
          onToggleAuthorFollow={toggleAuthorFollow}
        />
        <PostDetailContent content={post.content} />
        <PostDetailActionBar
          commentCount={commentCount}
          isDisliked={isDisliked}
          isAuthPending={isAuthPending}
          isLoggedIn={isLoggedIn}
          isLikePending={isLikePending}
          isLiked={isLiked}
          isRead={isRead}
          likeCount={likeCount}
          onRequireLogin={startGoogleLogin}
          viewCount={viewCount}
          onCommentClick={postDetailComments.requestCommentFocus}
          onShare={sharePostDetail}
          onToggleDislike={toggleDislike}
          onToggleLike={toggleLike}
          postId={postId}
        />
        <PostDetailCommentsSection
          comments={postDetailComments.comments}
          commentsHasNext={postDetailComments.commentsHasNext}
          commentsSort={postDetailComments.commentsSort}
          createCommentErrorMessage={postDetailComments.createCommentErrorMessage}
          focusRequestKey={postDetailComments.focusRequestKey}
          isCommentCreating={postDetailComments.isCommentCreating}
          isCommentsLoading={postDetailComments.isCommentsLoading}
          isCommentsLoadingMore={postDetailComments.isCommentsLoadingMore}
          postAuthorId={authorId}
          onClearCreateCommentError={postDetailComments.clearCreateCommentError}
          onCommentsSortChange={postDetailComments.handleCommentsSortChange}
          onCreateComment={postDetailComments.handleCreateComment}
          onDislikeComment={handleCommentDislikeButtonClick}
          onLikeComment={handleCommentLikeButtonClick}
          onLoadMoreComments={postDetailComments.handleLoadMoreComments}
        />
      </article>
    </PostDetailContainer>
  );
}
