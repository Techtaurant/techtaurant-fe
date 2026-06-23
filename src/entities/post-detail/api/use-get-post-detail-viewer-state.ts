import { getGetPostViewerStatesApiQueryKey, useGetPostViewerStatesApi } from '@/shared/api/generated';

type Params = {
  enabled: boolean;
  options?: RequestInit;
  postId: string;
};

const toPostViewerStateParams = (postId: string) => {
  return {
    postIds: [postId],
  };
};

export const getPostDetailViewerStateQueryKey = (postId: string) => {
  return getGetPostViewerStatesApiQueryKey(toPostViewerStateParams(postId));
};

export const useGetPostDetailViewerState = ({ enabled, options, postId }: Params) => {
  return useGetPostViewerStatesApi(toPostViewerStateParams(postId), {
    request: options,
    query: {
      enabled: enabled && Boolean(postId),
      queryKey: getPostDetailViewerStateQueryKey(postId),
      retry: false,
      select: (response) => response.data?.[0],
    },
  });
};
