import { getGetMeApiQueryKey, useGetMeApi } from '@/shared/api/generated';

export const getMeQueryKey = () => {
  return getGetMeApiQueryKey();
};

export const useGetMe = (options?: RequestInit) => {
  return useGetMeApi({
    request: options,
    query: {
      select: (response) => response.data,
    },
  });
};
