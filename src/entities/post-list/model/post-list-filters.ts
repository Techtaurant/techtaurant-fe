import { type GetPostsApiParams, GetPostsApiPeriod, GetPostsApiSort } from '@/shared/api/generated';

export type PostListPeriodFilter = (typeof GetPostsApiPeriod)[keyof typeof GetPostsApiPeriod];
export type PostListSortFilter = (typeof GetPostsApiSort)[keyof typeof GetPostsApiSort];

export type PostListFilters = {
  period: PostListPeriodFilter;
  sort: PostListSortFilter;
};

export type PostListApiParams = Omit<GetPostsApiParams, 'cursor'>;

export const POST_LIST_PERIOD_VALUES = new Set<PostListPeriodFilter>(Object.values(GetPostsApiPeriod));
export const POST_LIST_SORT_VALUES = new Set<PostListSortFilter>(Object.values(GetPostsApiSort));
