'use client';

import { useQueryClient } from '@tanstack/react-query';
import { useState } from 'react';

import { getPostListQueryKey } from '@/entities/post-list';
import { getDraftDetailQueryKey, useGetDraftDetail, useSaveDraft } from '@/entities/post-write';
import { CreatePostRequestStatus } from '@/shared/api/generated';
import { toast } from '@/shared/ui/toast';
import { useDraftIdSearchParam } from '@/views/post-write/model/use-draft-id-search-param';

const DRAFT_SAVE_SUCCESS_MESSAGE = '임시저장했어요.';
const DRAFT_SAVE_FAILED_MESSAGE = '임시저장하지 못했어요. 잠시 후 다시 시도해주세요.';
const DRAFT_EMPTY_MESSAGE = '제목이나 본문을 입력해주세요.';

type PostDraft = {
  content: string;
  title: string;
};

const EMPTY_DRAFT = { content: '', title: '' } satisfies PostDraft;

export const usePostWriteForm = () => {
  const [editedDraft, setEditedDraft] = useState<PostDraft | null>(null);
  const queryClient = useQueryClient();

  const { draftId, replaceDraftId } = useDraftIdSearchParam();
  const { data: savedDraft } = useGetDraftDetail({ postId: draftId });
  const saveDraftMutation = useSaveDraft({
    onSuccess: async (savedDraftId) => {
      const invalidateQueries = [queryClient.invalidateQueries({ queryKey: getPostListQueryKey() })];

      if (savedDraftId) {
        invalidateQueries.push(queryClient.invalidateQueries({ queryKey: getDraftDetailQueryKey(savedDraftId) }));
      }

      await Promise.all(invalidateQueries);
    },
  });

  // 편집을 시작하면 편집본이, 그전에는 불러온 임시저장 글이 화면을 담당합니다.
  const { content, title } = editedDraft ?? savedDraft ?? EMPTY_DRAFT;
  const isDraftSaving = saveDraftMutation.isPending;

  const handleTitleChange = (nextTitle: string) => {
    setEditedDraft({ content, title: nextTitle });
  };

  const handleContentChange = (nextContent: string) => {
    setEditedDraft({ content: nextContent, title });
  };

  const handleDraftSaveClick = async () => {
    if (!title.trim() && !content.trim()) {
      toast.error(DRAFT_EMPTY_MESSAGE);
      return;
    }

    try {
      const savedDraftId = await saveDraftMutation.mutateAsync({
        data: { content, status: CreatePostRequestStatus.DRAFT, title },
        draftId,
      });

      if (savedDraftId && !draftId) {
        replaceDraftId(savedDraftId);
      }

      toast.success(DRAFT_SAVE_SUCCESS_MESSAGE);
    } catch {
      toast.error(DRAFT_SAVE_FAILED_MESSAGE);
    }
  };

  return {
    content,
    handleContentChange,
    handleDraftSaveClick,
    handleTitleChange,
    isDraftSaving,
    title,
  };
};
