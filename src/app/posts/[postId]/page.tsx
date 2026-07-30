import { dehydrate, HydrationBoundary, QueryClient } from '@tanstack/react-query';
import { cookies } from 'next/headers';
import { notFound } from 'next/navigation';

import {
  fetchPostDetail,
  prefetchGetPostDetailMetadata,
  prefetchGetPostDetailViewerState,
} from '@/entities/post-detail';
import { prefetchGetUserProfileImage } from '@/entities/user';
import { PostDetailView } from '@/views/post-detail';

export const dynamic = 'force-dynamic';

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

  const post = await fetchPostDetail(queryClient, {
    postId,
    options: {
      cache: 'force-cache',
      next: { revalidate: POST_DETAIL_REVALIDATE_SECONDS },
    },
  });

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
    // TODO: 현재 accessToken이 cookieHeader에 없기 때문에 해당 prefetch는 항상 401임.
    // discord에서 쿠키 domain 논의 후 유지하거나 삭제 예정
    // https://discord.com/channels/1500805723960119316/1532021898131537962/1532383869242703973
    prefetchGetPostDetailViewerState(queryClient, {
      postId,
      options: {
        cache: 'no-store',
        cookieHeader,
      },
    }),
  ]);

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <PostDetailView postId={postId} />
    </HydrationBoundary>
  );
}
