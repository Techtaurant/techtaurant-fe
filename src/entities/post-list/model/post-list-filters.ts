import type { ReadonlyURLSearchParams } from 'next/navigation';

import type { GetPostsApiParams, GetPostsApiPeriod, GetPostsApiSort } from '@/shared/api/generated';

type SearchParamsValue = string | string[] | undefined;
type SearchParamsRecord = Record<string, SearchParamsValue>;
type SearchParamsWithGet = {
  get: (key: string) => string | null;
};
type SearchParamsLike = SearchParamsWithGet | SearchParamsRecord | undefined;

export type PostListPeriodFilter = NonNullable<GetPostsApiPeriod>;
export type PostListSortFilter = NonNullable<GetPostsApiSort>;

export type PostListFilters = {
  period: PostListPeriodFilter;
  sort: PostListSortFilter;
};

export const DEFAULT_POST_LIST_FILTERS: PostListFilters = {
  period: 'ALL',
  sort: 'LATEST',
};

const POST_LIST_PERIOD_VALUES = new Set<PostListPeriodFilter>(['WEEK', 'MONTH', 'YEAR', 'ALL']);
const POST_LIST_SORT_VALUES = new Set<PostListSortFilter>(['LATEST', 'VIEW', 'LIKE', 'COMMENT']);

const hasSearchParamGetter = (searchParams: SearchParamsLike): searchParams is SearchParamsWithGet => {
  return Boolean(
    searchParams && typeof searchParams === 'object' && 'get' in searchParams && typeof searchParams.get === 'function',
  );
};

const getSearchParamValue = (searchParams: SearchParamsLike, key: string) => {
  if (!searchParams) return undefined;

  if (searchParams instanceof URLSearchParams) {
    return searchParams.get(key) ?? undefined;
  }

  if (hasSearchParamGetter(searchParams)) {
    return searchParams.get(key) ?? undefined;
  }

  const value = searchParams[key];
  return Array.isArray(value) ? value[0] : value;
};

export const parsePostListFilters = (searchParams?: SearchParamsLike): PostListFilters => {
  const period = getSearchParamValue(searchParams, 'period');
  const sort = getSearchParamValue(searchParams, 'sort');

  return {
    period:
      period && POST_LIST_PERIOD_VALUES.has(period as PostListPeriodFilter) ? (period as PostListPeriodFilter) : 'ALL',
    sort: sort && POST_LIST_SORT_VALUES.has(sort as PostListSortFilter) ? (sort as PostListSortFilter) : 'LATEST',
  };
};

export const toPostListApiParams = (filters: PostListFilters, size: number): Omit<GetPostsApiParams, 'cursor'> => ({
  size,
  period: filters.period,
  sort: filters.sort,
});

export const buildPostListSearchParams = (
  currentSearchParams: URLSearchParams | ReadonlyURLSearchParams,
  nextFilters: Partial<PostListFilters>,
) => {
  const searchParams = new URLSearchParams(currentSearchParams.toString());
  const filters = {
    ...parsePostListFilters(currentSearchParams),
    ...nextFilters,
  };

  searchParams.set('period', filters.period);
  searchParams.set('sort', filters.sort);
  searchParams.delete('cursor');

  return searchParams;
};
