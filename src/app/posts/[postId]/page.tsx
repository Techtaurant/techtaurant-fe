import { dehydrate, HydrationBoundary, QueryClient } from '@tanstack/react-query';
import { cookies } from 'next/headers';
import { notFound } from 'next/navigation';

import {
  fetchPostDetail,
  prefetchGetPostDetailMetadata,
  prefetchGetPostDetailViewerState,
} from '@/entities/post-detail';
import { prefetchGetMe, prefetchGetUserProfileImage } from '@/entities/user';
import type { CustomFetchInit } from '@/shared/api/custom-fetch';
import { PostDetailView } from '@/views/post-detail';

export const dynamic = 'force-dynamic';

// TODO: 확인 필요
const POST_DETAIL_REVALIDATE_SECONDS = 60 * 60;

type Props = {
  params: Promise<{
    postId: string;
  }>;
};

export default async function Page({ params }: Props) {
  const { postId } = await params;
  const queryClient = new QueryClient();
  const cookieHeader = (await cookies()).toString();
  const authenticatedRequestOptions: CustomFetchInit = {
    cache: 'no-store',
    cookieHeader,
  };

  const [post, me] = await Promise.all([
    fetchPostDetail(queryClient, {
      postId,
      options: {
        cache: 'force-cache',
        next: { revalidate: POST_DETAIL_REVALIDATE_SECONDS },
      },
    }),
    prefetchGetMe(queryClient, authenticatedRequestOptions),
  ]);

  if (!post) {
    notFound();
  }

  await Promise.all([
    prefetchGetPostDetailMetadata(queryClient, {
      postId,
      options: {
        cache: 'no-store',
      },
    }),
    prefetchGetUserProfileImage(queryClient, {
      userId: post.author.id,
      options: {
        cache: 'force-cache',
        next: { revalidate: POST_DETAIL_REVALIDATE_SECONDS },
      },
    }),
    ...(me
      ? [
          prefetchGetPostDetailViewerState(queryClient, {
            postId,
            options: authenticatedRequestOptions,
          }),
        ]
      : []),
  ]);

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <PostDetailView postId={postId} />
    </HydrationBoundary>
  );
}
