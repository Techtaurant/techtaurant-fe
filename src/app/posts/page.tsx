import { dehydrate, HydrationBoundary, QueryClient } from '@tanstack/react-query';
import { cookies } from 'next/headers';

import {
  fetchPostList,
  parsePostListFilters,
  prefetchGetPostListMetadatas,
  prefetchGetPostListProfileImages,
  prefetchGetPostListViewerStates,
  toPostListApiParams,
} from '@/entities/post-list';
import { PostListView } from '@/views/post-list';

export const dynamic = 'force-dynamic';

const POST_LIST_REVALIDATE_SECONDS = 60 * 60;

type Props = {
  searchParams?: Promise<Record<string, string | string[] | undefined>>;
};

export default async function Page({ searchParams }: Props) {
  const queryClient = new QueryClient();
  const filters = parsePostListFilters(await searchParams);
  const cookieHeader = (await cookies()).toString();

  const postContents = await fetchPostList(queryClient, {
    params: toPostListApiParams(filters),
    // 1시간마다 최신화, SSR 시에는 캐시 사용
    options: {
      cache: 'force-cache',
      next: { revalidate: POST_LIST_REVALIDATE_SECONDS },
    },
  });
  const postIds = postContents.map((post) => post.id);
  const authorIds = Array.from(new Set(postContents.map((post) => post.authorId)));

  await Promise.all([
    prefetchGetPostListMetadatas(queryClient, {
      postIds,
      options: {
        cache: 'no-store',
      },
    }),
    prefetchGetPostListProfileImages(queryClient, {
      authorIds,
      options: {
        cache: 'force-cache',
        next: { revalidate: POST_LIST_REVALIDATE_SECONDS },
      },
    }),
    // TODO: 현재 accessToken이 cookieHeader에 없기 때문에 해당 prefetch는 항상 401임.
    // discord에서 쿠키 domain 논의 후 유지하거나 삭제 예정
    // https://discord.com/channels/1500805723960119316/1532021898131537962/1532383869242703973
    prefetchGetPostListViewerStates(queryClient, {
      postIds,
      options: {
        cache: 'no-store',
        cookieHeader,
      },
    }),
  ]);

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <PostListView />
    </HydrationBoundary>
  );
}
