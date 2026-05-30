import { dehydrate, HydrationBoundary, QueryClient } from '@tanstack/react-query';

import {
  DEFAULT_POST_LIST_SIZE,
  parsePostListFilters,
  prefetchGetPostList,
  toPostListApiParams,
} from '@/entities/post-list';
import { PostListView } from '@/views/post-list';

export const dynamic = 'force-dynamic';

type Props = {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
};

export default async function Page({ searchParams }: Props) {
  const queryClient = new QueryClient();
  const filters = parsePostListFilters(await searchParams);

  await prefetchGetPostList(queryClient, {
    params: toPostListApiParams(filters, DEFAULT_POST_LIST_SIZE),
    // 1시간마다 최신화, SSR 시에는 캐시 사용
    options: {
      cache: 'force-cache',
      next: { revalidate: 60 * 60 },
    },
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <PostListView />
    </HydrationBoundary>
  );
}
