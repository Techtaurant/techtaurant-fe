import type { PostContentListItemResponse } from '@/shared/api/generated';

export const getPostListPostIds = (posts: PostContentListItemResponse[]) => posts.map((post) => post.id);

export const getPostListAuthorIds = (posts: PostContentListItemResponse[]) => {
  return Array.from(new Set(posts.map((post) => post.authorId)));
};
