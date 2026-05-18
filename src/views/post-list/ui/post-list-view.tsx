'use client';

import { useInfiniteQuery } from '@tanstack/react-query';

import { DEFAULT_POST_LIST_SIZE, postListInfiniteQueryOptions } from '@/entities/post-list';
import { PostCard } from '@/widgets/post-card';

export function PostListView() {
  const { data } = useInfiniteQuery(
    postListInfiniteQueryOptions({
      params: {
        // TODO: useSearchParams를 통해 period, sort 등 주입
        size: DEFAULT_POST_LIST_SIZE,
      },
    }),
  );

  const postList = data?.pages.flatMap((posts) => posts.content) ?? [];

  if (postList.length <= 0)
    return (
      <div className="flex flex-col items-center justify-center py-20">
        <p className="text-muted-foreground text-lg">조건에 맞는 게시물이 없습니다.</p>
      </div>
    );

  // TODO: 다른 위젯 (정렬, 필터) 등 조립 필요
  return (
    <div className="mx-auto flex-1 px-4 py-6 md:max-w-182 md:px-6">
      {postList.map((post) => (
        <PostCard key={post.id} post={post} />
      ))}
    </div>
  );
}
