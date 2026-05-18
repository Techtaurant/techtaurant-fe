import { dehydrate, HydrationBoundary, QueryClient } from '@tanstack/react-query';

import { DEFAULT_POST_LIST_SIZE, postListInfiniteQueryOptions } from '@/entities/post-list';
import { PostListView } from '@/views/post-list';

export const dynamic = 'force-dynamic';

export default async function Page() {
  const queryClient = new QueryClient();

  await queryClient.prefetchInfiniteQuery(
    postListInfiniteQueryOptions({
      // TODO: 쿼리 스트링을 통해 period, sort 등 필터를 관리하고 주입
      params: {
        size: DEFAULT_POST_LIST_SIZE,
      },
      // 1시간마다 최신화, SSR 시에는 캐시 사용
      options: {
        cache: 'force-cache',
        next: { revalidate: 60 * 60 },
      },
    }),
  );

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <PostListView />
    </HydrationBoundary>
  );
}
