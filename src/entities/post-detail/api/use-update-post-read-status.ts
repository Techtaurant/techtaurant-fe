import { useToggleReadStatusApi } from '@/shared/api/generated';

export const useUpdatePostReadStatus = () => {
  return useToggleReadStatusApi();
};
