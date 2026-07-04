'use client';

import { overlay } from 'overlay-kit';

import type { PostDetailActionSnackbarState } from '@/views/post-detail/model/use-post-detail-action-snackbar';
import { PostDetailAuthorBlockConfirmModal } from '@/views/post-detail/ui/post-detail-author-block-confirm-modal';

type Params = {
  authorName?: string;
  blockAuthor: () => Promise<boolean>;
  showActionSnackbar: (nextActionSnackbar: PostDetailActionSnackbarState) => void;
};

const AUTHOR_BLOCK_FAILED_MESSAGE = '사용자를 차단하지 못했습니다.';
const AUTHOR_BLOCK_SUCCESS_MESSAGE = '사용자를 차단했어요.';

// TODO: 토스트 기반 차단 피드백 로직은 추후 별도 PR에서 변경합니다.
export const usePostDetailAuthorBlockConfirmFeedback = ({ authorName, blockAuthor, showActionSnackbar }: Params) => {
  const handleAuthorBlockConfirm = async () => {
    try {
      const isBlocked = await blockAuthor();

      if (!isBlocked) {
        showActionSnackbar({
          message: AUTHOR_BLOCK_FAILED_MESSAGE,
          variant: 'error',
        });
        return false;
      }

      showActionSnackbar({
        message: getAuthorBlockSuccessMessage(authorName),
        variant: 'blocked',
      });
      return true;
    } catch {
      showActionSnackbar({
        message: AUTHOR_BLOCK_FAILED_MESSAGE,
        variant: 'error',
      });
      return false;
    }
  };

  const openPostDetailAuthorBlockConfirmModal = () => {
    return overlay.open(({ overlayId, isOpen, unmount }) => (
      <PostDetailAuthorBlockConfirmModal
        overlayId={overlayId}
        isOpen={isOpen}
        onClose={unmount}
        onConfirm={handleAuthorBlockConfirm}
      />
    ));
  };

  return openPostDetailAuthorBlockConfirmModal;
};

const getAuthorBlockSuccessMessage = (authorName?: string) => {
  if (!authorName) return AUTHOR_BLOCK_SUCCESS_MESSAGE;

  return `${authorName}님을 차단했어요`;
};
