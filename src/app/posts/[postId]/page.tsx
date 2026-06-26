import { dehydrate, HydrationBoundary, QueryClient } from '@tanstack/react-query';

import { fetchPostDetail, prefetchGetPostDetailMetadata } from '@/entities/post-detail';
import { prefetchGetUserProfileImages } from '@/entities/user';
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

  const post = await fetchPostDetail(queryClient, {
    postId,
    options: {
      cache: 'force-cache',
      next: { revalidate: POST_DETAIL_REVALIDATE_SECONDS },
    },
  });

  if (!post) {
    return (
      <HydrationBoundary state={dehydrate(queryClient)}>
        <PostDetailView postId={postId} />
      </HydrationBoundary>
    );
  }

  await Promise.all([
    prefetchGetPostDetailMetadata(queryClient, {
      postId,
      options: {
        cache: 'no-store',
      },
    }),
    prefetchGetUserProfileImages(queryClient, {
      userIds: [post.author.id],
      options: {
        cache: 'force-cache',
        next: { revalidate: POST_DETAIL_REVALIDATE_SECONDS },
      },
    }),
  ]);

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <PostDetailView postId={postId} />
    </HydrationBoundary>
  );
}
