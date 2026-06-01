import type {
  ApiResponseCursorPageResponsePostContentListItemResponse,
  PostContentListItemResponse,
} from '@/shared/api/generated';

export const getPostListContentData = (pages: ApiResponseCursorPageResponsePostContentListItemResponse[]) => {
  const contentPages = pages.map(({ data }) => data?.content ?? []);

  return {
    pages: contentPages,
    posts: contentPages.flat(),
  };
};

const getPostListPostIds = (posts: PostContentListItemResponse[]) => posts.map((post) => post.id);

const getPostListAuthorIds = (posts: PostContentListItemResponse[]) => {
  return Array.from(new Set(posts.map((post) => post.authorId)));
};

export const getPostListPostIdGroups = (postGroups: PostContentListItemResponse[][]) => {
  return postGroups.map(getPostListPostIds).filter(({ length }) => length > 0);
};

export const getPostListAuthorIdGroups = (postGroups: PostContentListItemResponse[][]) => {
  return postGroups.map(getPostListAuthorIds).filter(({ length }) => length > 0);
};
