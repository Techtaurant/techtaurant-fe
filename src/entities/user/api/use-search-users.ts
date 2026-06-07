import type { SearchByNameApiParams, UserResponse } from '@/shared/api/generated';
import { useSearchByNameApi } from '@/shared/api/generated';

type Params = {
  enabled?: boolean;
  name: string;
  options?: RequestInit;
};

const getSearchUsersParams = (name: string): SearchByNameApiParams => ({
  name: name.trim(),
});

export const useSearchUsers = ({ enabled = true, name, options }: Params) => {
  const params = getSearchUsersParams(name);

  return useSearchByNameApi(params, {
    request: options,
    query: {
      enabled: enabled && params.name.length > 0,
      select: (response): UserResponse[] => response.data ?? [],
    },
  });
};
