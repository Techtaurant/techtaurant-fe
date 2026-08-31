import { useMutation } from '@tanstack/react-query';

import type { CreatePostRequest } from '@/shared/api/generated';
import { createPostApi, updatePostApi } from '@/shared/api/generated';

type SaveDraftVariables = {
  data: CreatePostRequest;
  draftId?: string;
};

type Params = {
  onSuccess: (savedDraftId?: string) => Promise<void> | void;
};

const saveDraft = async ({ data, draftId }: SaveDraftVariables) => {
  if (draftId) {
    await updatePostApi(draftId, data);

    return draftId;
  }

  const response = await createPostApi(data);

  return response.data?.id;
};

export const useSaveDraft = ({ onSuccess }: Params) => {
  return useMutation({
    mutationFn: saveDraft,
    onSuccess: (savedDraftId) => onSuccess(savedDraftId),
  });
};
