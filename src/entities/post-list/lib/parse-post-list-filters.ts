import {
  POST_LIST_PERIOD_VALUES,
  POST_LIST_SORT_VALUES,
  type PostListFilters,
  type PostListPeriodFilter,
  type PostListSortFilter,
} from '@/entities/post-list/model/post-list-filters';
import { GetPostsApiPeriod, GetPostsApiSort } from '@/shared/api/generated';
import { getSearchParamValue, type SearchParamsLike } from '@/shared/lib/search-params';

const filterValidPostListPeriodParam = (period?: string | null): PostListPeriodFilter | undefined => {
  if (period && POST_LIST_PERIOD_VALUES.has(period as PostListPeriodFilter)) {
    return period as PostListPeriodFilter;
  }

  return undefined;
};

const filterValidPostListSortParam = (sort?: string | null): PostListSortFilter | undefined => {
  if (sort && POST_LIST_SORT_VALUES.has(sort as PostListSortFilter)) {
    return sort as PostListSortFilter;
  }

  return undefined;
};

export const parsePostListFilters = (searchParams?: SearchParamsLike): PostListFilters => {
  const period = getSearchParamValue(searchParams, 'period');
  const sort = getSearchParamValue(searchParams, 'sort');

  return {
    period: filterValidPostListPeriodParam(period) ?? GetPostsApiPeriod.ALL,
    sort: filterValidPostListSortParam(sort) ?? GetPostsApiSort.LATEST,
  };
};
