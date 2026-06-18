import type { ReactNode } from 'react';

import type { usePostListViewData } from '@/views/post-list/model/use-post-list-view-data';

type PostListItem = ReturnType<typeof usePostListViewData>['posts'][number];

type Props = {
  isRefreshing: boolean;
  posts: PostListItem[];
  renderEmpty: () => ReactNode;
  renderPosts: (posts: PostListItem[], state: { isRefreshing: boolean }) => ReactNode;
};

export function PostList({ isRefreshing, posts, renderEmpty, renderPosts }: Props) {
  if (posts.length > 0) {
    return renderPosts(posts, { isRefreshing });
  }

  if (isRefreshing) return null;

  return renderEmpty();
}
