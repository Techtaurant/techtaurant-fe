'use client';

import { useSearchParams } from 'next/navigation';

import {
  DEFAULT_POST_LIST_SIZE,
  parsePostListFilters,
  toPostListApiParams,
  useGetPostList,
} from '@/entities/post-list';
import { Observer } from '@/shared/ui/intersection-observer';
import { PostCard } from '@/widgets/post-card';

import { PostListFilterBar } from './post-list-filter-bar';

export function PostListView() {
  const searchParams = useSearchParams();
  const filters = parsePostListFilters(searchParams);
  const { isFetchingNextPage, data, fetchNextPage } = useGetPostList({
    params: toPostListApiParams(filters, DEFAULT_POST_LIST_SIZE),
  });
  const posts = data ?? [];

  const handleObserverEnter = () => {
    if (isFetchingNextPage) return;
    fetchNextPage();
  };

  if (posts.length <= 0) {
    return (
      <section className="mx-auto flex-1 px-4 py-6 md:max-w-182 md:px-6">
        <PostListFilterBar />
        <div className="flex flex-col items-center justify-center py-20">
          <p className="text-muted-foreground text-lg">조건에 맞는 게시물이 없습니다.</p>
        </div>
      </section>
    );
  }

  return (
    <section className="mx-auto flex-1 px-4 py-6 md:max-w-182 md:px-6">
      <PostListFilterBar />
      {posts.map((post) => (
        <PostCard key={post.id} post={post} />
      ))}
      <Observer onEnter={handleObserverEnter} />
    </section>
  );
}
