'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';

import { uploadAttachment } from '@/entities/attachment';
import { getMeQueryKey, updateMe } from '@/entities/user';
import { PresignedUrlRequestReferenceType } from '@/shared/api/generated';

type Params = {
  name: string;
  imageFile: File | null;
};

const updateProfile = async ({ name, imageFile }: Params) => {
  const uploaded = await uploadAttachment({ file: imageFile, referenceType: PresignedUrlRequestReferenceType.USER });

  return updateMe({
    name,
    serviceProfileImageAttachmentId: uploaded?.attachmentId,
  });
};

export const useUpdateProfile = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateProfile,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: getMeQueryKey() }),
  });
};
