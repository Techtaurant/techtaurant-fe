import { useGetUserProfileImagesApi } from '@/shared/api/generated';

type Params = {
  options?: RequestInit;
  userId?: string;
};

export const useGetUserProfileImage = ({ options, userId }: Params) => {
  return useGetUserProfileImagesApi(
    { userIds: userId ? [userId] : [] },
    {
      request: options,
      query: {
        enabled: Boolean(userId),
        select: (response) => response.data?.[0],
      },
    },
  );
};
