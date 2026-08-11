'use client';

import { useState } from 'react';

import { startGoogleLogin } from '@/features/auth';
import { PostDetailCommentsSection } from '@/features/post-comments';
import { PostDetailActionBar } from '@/features/post-detail-interactions';
import { usePostDetailViewData } from '@/views/post-detail/model/use-post-detail-view-data';
import { useRecordPostViewOnce } from '@/views/post-detail/model/use-record-post-view-once';
import { PostDetailArticleHeader } from '@/views/post-detail/ui/post-detail-article-header';
import { PostDetailBlockedFallback } from '@/views/post-detail/ui/post-detail-blocked-fallback';
import { PostDetailContainer } from '@/views/post-detail/ui/post-detail-container';
import { PostDetailContent } from '@/views/post-detail/ui/post-detail-content';

type Props = {
  postId: string;
};

export function PostDetailView({ postId }: Props) {
  const [commentFocusRequestKey, setCommentFocusRequestKey] = useState(0);
  const { authorProfile, isViewerStateResolved, metadata, post, viewerState } = usePostDetailViewData(postId);

  const isAuthorBanned = viewerState?.isBanned ?? false;
  const viewCount = metadata?.viewCount ?? 0;
  const likeCount = metadata?.likeCount ?? 0;
  const commentCount = metadata?.commentCount ?? 0;

  useRecordPostViewOnce({
    enabled: !!post && isViewerStateResolved && !isAuthorBanned,
    postId,
  });

  const handleCommentButtonClick = () => {
    setCommentFocusRequestKey((currentKey) => currentKey + 1);
  };

  if (!post) {
    return null;
  }

  const authorId = post.author.id;

  if (isAuthorBanned) {
    return <PostDetailBlockedFallback />;
  }

  return (
    <PostDetailContainer>
      <article>
        <PostDetailArticleHeader
          authorId={authorId}
          authorName={authorProfile?.authorName}
          categoryName={post.category?.name}
          createdAt={post.createdAt}
          postId={postId}
          profileImageUrl={authorProfile?.profileImageUrl}
          tags={post.tags}
          title={post.title}
          updatedAt={post.updatedAt}
        />
        <PostDetailContent content={post.content} />
        <PostDetailActionBar
          commentCount={commentCount}
          isRead={viewerState?.isRead}
          likeCount={likeCount}
          likeStatus={viewerState?.likeStatus}
          onRequireLogin={startGoogleLogin}
          viewCount={viewCount}
          onCommentClick={handleCommentButtonClick}
          postId={postId}
        />
        <PostDetailCommentsSection
          commentCount={commentCount}
          focusRequestKey={commentFocusRequestKey}
          onRequireLogin={startGoogleLogin}
          postAuthorId={authorId}
          postId={postId}
        />
      </article>
    </PostDetailContainer>
  );
}
