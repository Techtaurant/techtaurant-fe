import { RecordPostLikeRequestLikeStatus, useRecordLikeApi } from '@/shared/api/generated';

export const POST_LIKE_STATUS = RecordPostLikeRequestLikeStatus;

export type PostLikeStatus = RecordPostLikeRequestLikeStatus;

export const useUpdatePostLikeStatus = () => {
  return useRecordLikeApi();
};
