import { useQueryClient } from '@tanstack/react-query';

import { getMyBannedUsersQueryKey } from '@/entities/user/api/use-get-my-banned-users';
import { useUnbanUserApi } from '@/shared/api/generated';

export const useDeleteMyBannedUser = () => {
  const queryClient = useQueryClient();

  return useUnbanUserApi({
    mutation: {
      onSuccess: () => queryClient.invalidateQueries({ queryKey: getMyBannedUsersQueryKey() }),
    },
  });
};
