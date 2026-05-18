import { queryOptions } from '@tanstack/react-query';

import { getGetMeQueryKey, getMe } from '@/shared/api/generated';

// TODO: fetch orval 쓰면서 별도 queryFn 없이 사용할 수 있는 방법 찾기
const getMeQueryFn = async (options?: RequestInit) => {
  const response = await getMe(options);

  if (response.status !== 200) {
    return null;
  }

  return response.data.data ?? null;
};

export const meQueryOptions = (options?: RequestInit) => {
  return queryOptions({
    queryFn: () => getMeQueryFn(options),
    queryKey: getGetMeQueryKey(),
  });
};
