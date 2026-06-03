'use client';

import { Observer } from '@/shared/ui/intersection-observer';
import { usePostListViewData } from '@/views/post-list/model/use-post-list-view-data';
import { PostCard } from '@/widgets/post-card';
import { PostListFilterBar } from '@/widgets/post-list-filter-bar';

export function PostListView() {
  const { fetchNextPage, isFetchingNextPage, posts } = usePostListViewData();

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
