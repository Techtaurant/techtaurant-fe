'use client';

import { useGetPostDetail, useGetPostDetailMetadata, useGetPostDetailViewerState } from '@/entities/post-detail';
import { useGetMe, useGetUserProfileImage } from '@/entities/user';

export const usePostDetailViewData = (postId: string) => {
  const postQuery = useGetPostDetail({ postId });
  const { data: me, isPending: isAuthPending } = useGetMe();

  const post = postQuery.data;
  const authorId = post?.author.id;
  const isLoggedIn = !!me;

  const authorProfileQuery = useGetUserProfileImage({ userId: authorId });
  const metadataQuery = useGetPostDetailMetadata({ postId });

  const viewerStateQuery = useGetPostDetailViewerState({
    enabled: isLoggedIn,
    postId,
  });
  const isViewerStateResolved = !isAuthPending && (!isLoggedIn || !viewerStateQuery.isPending);

  return {
    authorProfile: authorProfileQuery.data,
    isViewerStateResolved,
    metadata: metadataQuery.data,
    post,
    viewerState: viewerStateQuery.data,
  };
};
