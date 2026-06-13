import type { QueryClient } from '@tanstack/react-query';

import { DEFAULT_TAG_LIST_SIZE } from '@/entities/tag/config/constants';
import type { GetTagsApiParams, TagResponse } from '@/shared/api/generated';
import { getGetTagsApiQueryKey, prefetchGetTagsApiQuery, useGetTagsApi } from '@/shared/api/generated';

type TagListSearchParams = Pick<GetTagsApiParams, 'name'>;

type Params = {
  options?: RequestInit;
  params?: TagListSearchParams;
};

const getTagListParams = (params?: TagListSearchParams): GetTagsApiParams => ({
  size: DEFAULT_TAG_LIST_SIZE,
  ...params,
});

const getTagsQueryKey = (params?: TagListSearchParams) => {
  return getGetTagsApiQueryKey(getTagListParams(params));
};

export const useGetTags = ({ options, params }: Params = {}) => {
  return useGetTagsApi(getTagListParams(params), {
    request: options,
    query: {
      queryKey: getTagsQueryKey(params),
      select: (response): TagResponse[] => response.data?.content ?? [],
    },
  });
};

export const prefetchGetTags = async (queryClient: QueryClient, { options, params }: Params = {}) => {
  await prefetchGetTagsApiQuery(queryClient, getTagListParams(params), {
    query: {
      queryKey: getTagsQueryKey(params),
    },
    request: options,
  });
};
