import type { UpdateUserRequest } from '@/shared/api/generated';
import { updateMeApi } from '@/shared/api/generated';

export const updateMe = async (request: UpdateUserRequest) => {
  const { data } = await updateMeApi(request);
  return data;
};
