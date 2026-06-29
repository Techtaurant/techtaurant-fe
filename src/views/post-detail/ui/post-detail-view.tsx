'use client';

import { POST_LIKE_STATUS } from '@/entities/post-detail';
import { startGoogleLogin } from '@/features/auth';
import {
  PostDetailActionBar,
  usePostDetailAuthorBlock,
  usePostDetailAuthorFollow,
  usePostDetailInteractions,
} from '@/features/post-detail-interactions';
import { usePostDetailActionSnackbar } from '@/views/post-detail/model/use-post-detail-action-snackbar';
import { usePostDetailAuthorBlockConfirm } from '@/views/post-detail/model/use-post-detail-author-block-confirm';
import { usePostDetailAuthorFollowFeedback } from '@/views/post-detail/model/use-post-detail-author-follow-feedback';
import { usePostDetailShare } from '@/views/post-detail/model/use-post-detail-share';
import { usePostDetailViewData } from '@/views/post-detail/model/use-post-detail-view-data';
import { useRecordPostViewOnce } from '@/views/post-detail/model/use-record-post-view-once';
import { PostDetailActionSnackbar } from '@/views/post-detail/ui/post-detail-action-snackbar';
import { PostDetailArticleHeader } from '@/views/post-detail/ui/post-detail-article-header';
import { PostDetailConfirmDialog } from '@/views/post-detail/ui/post-detail-confirm-dialog';
import { PostDetailContainer } from '@/views/post-detail/ui/post-detail-container';
import { PostDetailContent } from '@/views/post-detail/ui/post-detail-content';
import { PostDetailFallback } from '@/views/post-detail/ui/post-detail-fallback';

type Props = {
  postId: string;
};

const UNKNOWN_AUTHOR_NAME = '알 수 없음';

export function PostDetailView({ postId }: Props) {
  // TODO: 토스트 관련 상태 연결은 추후 별도 PR에서 변경합니다.
  const { actionSnackbarMessage, actionSnackbarVariant, isActionSnackbarOpen, showActionSnackbar } =
    usePostDetailActionSnackbar();
  const { authorProfile, currentUserId, isAuthPending, isLoggedIn, metadata, post, viewerState } =
    usePostDetailViewData(postId);
  const authorId = post?.author.id;
  const authorName = authorProfile?.authorName ?? UNKNOWN_AUTHOR_NAME;
  const likeStatus = viewerState?.likeStatus ?? POST_LIKE_STATUS.NONE;
  const isLiked = likeStatus === POST_LIKE_STATUS.LIKE;
  const isDisliked = likeStatus === POST_LIKE_STATUS.DISLIKE;
  const isRead = viewerState?.isRead ?? false;
  const viewCount = metadata?.viewCount ?? 0;
  const likeCount = metadata?.likeCount ?? 0;
  const commentCount = metadata?.commentCount ?? 0;
  const { isLikePending, isReadPending, toggleDislike, toggleLike, toggleRead } = usePostDetailInteractions({
    isAuthPending,
    isLoggedIn,
    isRead,
    likeStatus,
    onRequireLogin: startGoogleLogin,
    postId,
  });
  const { isFollowingAuthor, isFollowingUpdating, isOwnAuthor, toggleAuthorFollow } = usePostDetailAuthorFollow({
    authorId,
    currentUserId,
    isAuthPending,
    isLoggedIn,
    onRequireLogin: startGoogleLogin,
  });
  const { toggleAuthorFollowWithFeedback } = usePostDetailAuthorFollowFeedback({
    authorName,
    isFollowingAuthor,
    showActionSnackbar,
    toggleAuthorFollow,
  });
  const { blockAuthor, isAuthorBlockPending } = usePostDetailAuthorBlock({
    authorId,
    currentUserId,
    isAuthPending,
    isLoggedIn,
    isOwnAuthor,
    onRequireLogin: startGoogleLogin,
    postId,
  });
  const { sharePostDetail } = usePostDetailShare({
    showActionSnackbar,
  });
  const {
    authorBlockConfirmCancelLabel,
    authorBlockConfirmConfirmLabel,
    authorBlockConfirmDescription,
    authorBlockConfirmTitle,
    closeAuthorBlockConfirm,
    confirmAuthorBlock,
    isAuthorBlockConfirmOpen,
    requestAuthorBlockConfirm,
  } = usePostDetailAuthorBlockConfirm({
    authorName: authorProfile?.authorName,
    blockAuthor,
    isAuthPending,
    isLoggedIn,
    onRequireLogin: startGoogleLogin,
    showActionSnackbar,
  });

  useRecordPostViewOnce({
    enabled: Boolean(post),
    postId,
  });

  if (!post) {
    return <PostDetailFallback />;
  }

  const profileImageUrl = authorProfile?.profileImageUrl ?? '';

  return (
    <PostDetailContainer>
      <article>
        <PostDetailArticleHeader
          authorName={authorName}
          categoryName={post.category?.name}
          createdAt={post.createdAt}
          isAuthorBlockPending={isAuthorBlockPending}
          isAuthPending={isAuthPending}
          isFollowingAuthor={isFollowingAuthor}
          isFollowingUpdating={isFollowingUpdating}
          isOwnAuthor={isOwnAuthor}
          profileImageUrl={profileImageUrl}
          tags={post.tags}
          title={post.title}
          updatedAt={post.updatedAt}
          onRequestBlockAuthor={requestAuthorBlockConfirm}
          onToggleAuthorFollow={toggleAuthorFollowWithFeedback}
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
          isReadPending={isReadPending}
          likeCount={likeCount}
          viewCount={viewCount}
          onShare={sharePostDetail}
          onToggleDislike={toggleDislike}
          onToggleLike={toggleLike}
          onToggleRead={toggleRead}
        />
      </article>
      {/* TODO: 토스트 UI 연결은 추후 별도 PR에서 변경합니다. */}
      <PostDetailActionSnackbar
        isOpen={isActionSnackbarOpen}
        message={actionSnackbarMessage}
        variant={actionSnackbarVariant}
      />
      <PostDetailConfirmDialog
        cancelLabel={authorBlockConfirmCancelLabel}
        confirmLabel={authorBlockConfirmConfirmLabel}
        description={authorBlockConfirmDescription}
        isConfirming={isAuthorBlockPending}
        isOpen={isAuthorBlockConfirmOpen}
        title={authorBlockConfirmTitle}
        onCancel={closeAuthorBlockConfirm}
        onConfirm={confirmAuthorBlock}
      />
    </PostDetailContainer>
  );
}
