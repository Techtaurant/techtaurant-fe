import { DEFAULT_POST_LIST_SIZE } from '@/entities/post-list/config/constants';
import type { PostListApiParams, PostListFilters } from '@/entities/post-list/model/post-list-filters';

export const toPostListApiParams = (filters: PostListFilters): PostListApiParams => ({
  size: DEFAULT_POST_LIST_SIZE,
  ...(!!filters.authorId && { authorId: filters.authorId }),
  period: filters.period,
  sort: filters.sort,
  ...(filters.tagIds.length > 0 && { tagIds: filters.tagIds }),
});
