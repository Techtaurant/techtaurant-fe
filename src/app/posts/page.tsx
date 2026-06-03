import { dehydrate, HydrationBoundary, QueryClient } from '@tanstack/react-query';

import {
  fetchPostList,
  getPostListAuthorIdGroups,
  getPostListPostIdGroups,
  parsePostListFilters,
  prefetchGetPostListMetadatas,
  prefetchGetPostListProfileImages,
  toPostListApiParams,
} from '@/entities/post-list';
import { PostListView } from '@/views/post-list';

export const dynamic = 'force-dynamic';

type Props = {
  searchParams?: Promise<Record<string, string | string[] | undefined>>;
};

export default async function Page({ searchParams }: Props) {
  const queryClient = new QueryClient();
  const filters = parsePostListFilters(await searchParams);

  const postListData = await fetchPostList(queryClient, {
    params: toPostListApiParams(filters),
    // 1시간마다 최신화, SSR 시에는 캐시 사용
    options: {
      cache: 'force-cache',
      next: { revalidate: 60 * 60 },
    },
  });
  const postIdGroups = getPostListPostIdGroups(postListData.pages);
  const authorIdGroups = getPostListAuthorIdGroups(postListData.pages);

  await Promise.all([
    prefetchGetPostListMetadatas(queryClient, {
      postIdGroups,
      options: {
        cache: 'no-store',
      },
    }),
    prefetchGetPostListProfileImages(queryClient, {
      authorIdGroups,
      options: {
        cache: 'force-cache',
        next: { revalidate: 60 * 60 },
      },
    }),
  ]);

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <PostListView />
    </HydrationBoundary>
  );
}
