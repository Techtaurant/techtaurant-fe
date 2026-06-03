import {
  POST_LIST_PERIOD_VALUES,
  POST_LIST_SORT_VALUES,
  type PostListFilters,
  type PostListPeriodFilter,
  type PostListSortFilter,
} from '@/entities/post-list/model/post-list-filters';
import { GetPostContentsApiPeriod, GetPostContentsApiSort } from '@/shared/api/generated';
import { getSearchParamValue, type SearchParamsLike } from '@/shared/lib/search-params';

const isValidPeriodValue = (value: string | null | undefined): value is PostListPeriodFilter => {
  return Boolean(value && POST_LIST_PERIOD_VALUES.has(value as PostListPeriodFilter));
};

const isValidSortValue = (value: string | null | undefined): value is PostListSortFilter => {
  return Boolean(value && POST_LIST_SORT_VALUES.has(value as PostListSortFilter));
};

export const parsePostListFilters = (searchParams?: SearchParamsLike): PostListFilters => {
  const period = getSearchParamValue(searchParams, 'period');
  const sort = getSearchParamValue(searchParams, 'sort');

  return {
    period: isValidPeriodValue(period) ? period : GetPostContentsApiPeriod.ALL,
    sort: isValidSortValue(sort) ? sort : GetPostContentsApiSort.LATEST,
  };
};
