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
import { prefetchGetMe } from '@/entities/user';
import type { CustomFetchInit } from '@/shared/api/custom-fetch';
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
  const authenticatedRequestOptions: CustomFetchInit = {
    cache: 'no-store',
    cookieHeader,
  };

  const [postContents, me] = await Promise.all([
    fetchPostList(queryClient, {
      params: toPostListApiParams(filters),
      // 1시간마다 최신화, SSR 시에는 캐시 사용
      options: {
        cache: 'force-cache',
        next: { revalidate: POST_LIST_REVALIDATE_SECONDS },
      },
    }),
    prefetchGetMe(queryClient, authenticatedRequestOptions),
  ]);
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
    ...(me
      ? [
          prefetchGetPostListViewerStates(queryClient, {
            postIds,
            options: authenticatedRequestOptions,
          }),
        ]
      : []),
  ]);

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <PostListView />
    </HydrationBoundary>
  );
}
