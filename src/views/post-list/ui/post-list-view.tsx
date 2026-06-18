'use client';

import { cn } from '@/shared/lib/cn';
import { Observer } from '@/shared/ui/intersection-observer';
import { usePostListViewData } from '@/views/post-list/model/use-post-list-view-data';
import { PostList } from '@/views/post-list/ui/post-list';
import { PostCard } from '@/widgets/post-card';
import { PostListFilterBar } from '@/widgets/post-list-filter-bar';
import { PostListSidebar } from '@/widgets/post-list-sidebar';

export function PostListView() {
  const { fetchNextPage, isFetchingNextPage, isRefreshingPostList, posts } = usePostListViewData();

  const handleObserverEnter = () => {
    if (isRefreshingPostList || isFetchingNextPage) return;

    fetchNextPage();
  };

  return (
    <div className="mx-auto flex w-full max-w-350 gap-6 px-4 py-6 md:px-6">
      <PostListSidebar />
      <section className="mx-auto w-full max-w-182 min-w-0">
        <PostListFilterBar />
        <PostList
          posts={posts}
          isRefreshing={isRefreshingPostList}
          renderPosts={(posts, { isRefreshing }) => (
            <>
              <div className={cn('transition-opacity', isRefreshing && 'opacity-60')}>
                {posts.map((post) => (
                  <PostCard key={post.id} post={post} />
                ))}
              </div>
              <Observer onEnter={handleObserverEnter} />
            </>
          )}
          renderEmpty={() => (
            <div className="flex flex-col items-center justify-center py-20">
              <p className="text-muted-foreground text-lg">조건에 맞는 게시물이 없습니다.</p>
            </div>
          )}
        />
      </section>
    </div>
  );
}
