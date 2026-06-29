import { useState } from 'react';

import type { PostDetailActionSnackbarState } from '@/views/post-detail/model/use-post-detail-action-snackbar';

type Params = {
  authorName?: string;
  blockAuthor: () => Promise<boolean>;
  isAuthPending: boolean;
  isLoggedIn: boolean;
  onRequireLogin: () => void;
  showActionSnackbar: (nextActionSnackbar: PostDetailActionSnackbarState) => void;
};

const AUTHOR_BLOCK_CONFIRM_TITLE = '이 사용자를 차단할까요?';
const AUTHOR_BLOCK_CONFIRM_DESCRIPTION = '이 사용자를 차단한 계정 목록에 추가합니다.';
const AUTHOR_BLOCK_CONFIRM_ACTION = '차단하기';
const AUTHOR_BLOCK_CANCEL_ACTION = '취소';
const AUTHOR_BLOCK_FAILED_MESSAGE = '사용자를 차단하지 못했습니다.';
const AUTHOR_BLOCK_SUCCESS_MESSAGE = '사용자를 차단했어요.';

// TODO: 토스트 기반 차단 피드백 로직은 추후 별도 PR에서 변경합니다.
export const usePostDetailAuthorBlockConfirm = ({
  authorName,
  blockAuthor,
  isAuthPending,
  isLoggedIn,
  onRequireLogin,
  showActionSnackbar,
}: Params) => {
  const [isAuthorBlockConfirmOpen, setIsAuthorBlockConfirmOpen] = useState(false);

  const requestAuthorBlockConfirm = () => {
    if (isAuthPending) return;

    if (!isLoggedIn) {
      onRequireLogin();
      return;
    }

    setIsAuthorBlockConfirmOpen(true);
  };

  const closeAuthorBlockConfirm = () => {
    setIsAuthorBlockConfirmOpen(false);
  };

  const confirmAuthorBlock = async () => {
    try {
      const isBlocked = await blockAuthor();

      if (!isBlocked) {
        showActionSnackbar({
          message: AUTHOR_BLOCK_FAILED_MESSAGE,
          variant: 'error',
        });
        return;
      }

      closeAuthorBlockConfirm();
      showActionSnackbar({
        message: getAuthorBlockSuccessMessage(authorName),
        variant: 'blocked',
      });
    } catch {
      showActionSnackbar({
        message: AUTHOR_BLOCK_FAILED_MESSAGE,
        variant: 'error',
      });
    }
  };

  return {
    authorBlockConfirmCancelLabel: AUTHOR_BLOCK_CANCEL_ACTION,
    authorBlockConfirmConfirmLabel: AUTHOR_BLOCK_CONFIRM_ACTION,
    authorBlockConfirmDescription: AUTHOR_BLOCK_CONFIRM_DESCRIPTION,
    authorBlockConfirmTitle: AUTHOR_BLOCK_CONFIRM_TITLE,
    closeAuthorBlockConfirm,
    confirmAuthorBlock,
    isAuthorBlockConfirmOpen,
    requestAuthorBlockConfirm,
  };
};

const getAuthorBlockSuccessMessage = (authorName?: string) => {
  if (!authorName) return AUTHOR_BLOCK_SUCCESS_MESSAGE;

  return `${authorName}님을 차단했어요`;
};
