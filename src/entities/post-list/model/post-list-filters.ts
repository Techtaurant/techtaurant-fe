import type { GetPostContentsApiParams } from '@/shared/api/generated';
import { GetPostContentsApiPeriod, GetPostContentsApiSort } from '@/shared/api/generated';

export type PostListPeriodFilter = (typeof GetPostContentsApiPeriod)[keyof typeof GetPostContentsApiPeriod];
export type PostListSortFilter = (typeof GetPostContentsApiSort)[keyof typeof GetPostContentsApiSort];

export type PostListFilters = {
  period: PostListPeriodFilter;
  sort: PostListSortFilter;
};

export type PostListApiParams = Omit<GetPostContentsApiParams, 'cursor'>;

export const POST_LIST_PERIOD_VALUES = new Set<PostListPeriodFilter>(Object.values(GetPostContentsApiPeriod));
export const POST_LIST_SORT_VALUES = new Set<PostListSortFilter>(Object.values(GetPostContentsApiSort));
