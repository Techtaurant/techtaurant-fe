'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';

import { uploadAttachment } from '@/entities/attachment';
import { getMeQueryKey } from '@/entities/user';
import { PresignedUrlRequestReferenceType, updateMeApi } from '@/shared/api/generated';

type Params = {
  name: string;
  imageFile: File | null;
};

const updateProfile = async ({ name, imageFile }: Params) => {
  const uploaded = await uploadAttachment({ file: imageFile, referenceType: PresignedUrlRequestReferenceType.USER });
  const { data } = await updateMeApi({
    name,
    serviceProfileImageAttachmentId: uploaded?.attachmentId,
  });

  return data;
};

export const useUpdateProfile = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateProfile,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: getMeQueryKey() }),
  });
};
