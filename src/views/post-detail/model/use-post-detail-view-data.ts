'use client';

import { useGetPostDetail, useGetPostDetailMetadata, useGetPostDetailViewerState } from '@/entities/post-detail';
import { useGetMe, useGetUserProfileImage } from '@/entities/user';

export const usePostDetailViewData = (postId: string) => {
  const postQuery = useGetPostDetail({ postId });
  const meQuery = useGetMe();
  const post = postQuery.data;
  const authorId = post?.author.id;
  const authorProfileQuery = useGetUserProfileImage({ userId: authorId });
  const metadataQuery = useGetPostDetailMetadata({ postId });
  const viewerStateQuery = useGetPostDetailViewerState({
    enabled: !!meQuery.data,
    postId,
  });

  return {
    authorProfile: authorProfileQuery.data,
    currentUserId: meQuery.data?.id,
    isAuthPending: meQuery.isPending,
    isLoggedIn: !!meQuery.data,
    metadata: metadataQuery.data,
    post,
    viewerState: viewerStateQuery.data,
  };
};
