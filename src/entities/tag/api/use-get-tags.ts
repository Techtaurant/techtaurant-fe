import type { QueryClient } from '@tanstack/react-query';
import { keepPreviousData } from '@tanstack/react-query';

import { DEFAULT_TAG_LIST_SIZE } from '@/entities/tag/config/constants';
import type { GetTagsApiParams, TagResponse } from '@/shared/api/generated';
import {
  getGetTagsApiInfiniteQueryKey,
  prefetchGetTagsApiInfiniteQuery,
  useGetTagsApiInfinite,
} from '@/shared/api/generated';

type Params = {
  options?: RequestInit;
  params?: GetTagsApiParams;
};

const getTagListParams = (params?: GetTagsApiParams): GetTagsApiParams => ({
  size: DEFAULT_TAG_LIST_SIZE,
  ...params,
});

const getTagsQueryKey = (params?: GetTagsApiParams) => {
  return getGetTagsApiInfiniteQueryKey(getTagListParams(params));
};

export const useGetTags = ({ options, params }: Params = {}) => {
  return useGetTagsApiInfinite(getTagListParams(params), {
    request: options,
    query: {
      initialPageParam: undefined as GetTagsApiParams['cursor'],
      getNextPageParam: (lastPage) => lastPage.data?.nextCursor ?? undefined,
      placeholderData: keepPreviousData,
      queryKey: getTagsQueryKey(params),
      select: (data): TagResponse[] => data.pages.flatMap(({ data }) => data?.content ?? []),
    },
  });
};

export const prefetchGetTags = async (queryClient: QueryClient, { options, params }: Params = {}) => {
  await prefetchGetTagsApiInfiniteQuery(queryClient, getTagListParams(params), {
    query: {
      initialPageParam: undefined as GetTagsApiParams['cursor'],
      getNextPageParam: (lastPage) => lastPage.data?.nextCursor ?? undefined,
      queryKey: getTagsQueryKey(params),
    },
    request: options,
  });
};
