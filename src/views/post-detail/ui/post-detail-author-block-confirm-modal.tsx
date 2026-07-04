'use client';

import { useState } from 'react';

import { Button } from '@/shared/ui/button';
import { Modal } from '@/shared/ui/modal';

type Props = {
  overlayId: string;
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => Promise<boolean>;
};

const DIALOG_BUTTON_CLASS_NAME =
  'h-10 min-w-[136px] flex-1 rounded-lg px-4 py-2 text-center text-sm font-semibold whitespace-nowrap';
const AUTHOR_BLOCK_CONFIRM_TITLE = '이 사용자를 차단할까요?';
const AUTHOR_BLOCK_CONFIRM_DESCRIPTION = '이 사용자를 차단한 계정 목록에 추가합니다.';
const AUTHOR_BLOCK_CONFIRM_ACTION = '차단하기';
const AUTHOR_BLOCK_CANCEL_ACTION = '취소';

export function PostDetailAuthorBlockConfirmModal({ overlayId, isOpen, onClose, onConfirm }: Props) {
  const [isConfirming, setIsConfirming] = useState(false);

  const handleModalClose = () => {
    if (isConfirming) return;

    onClose();
  };

  const handleConfirmButtonClick = async () => {
    if (isConfirming) return;

    setIsConfirming(true);

    try {
      const shouldClose = await onConfirm();

      if (shouldClose) {
        setIsConfirming(false);
        onClose();
        return;
      }

      setIsConfirming(false);
    } catch {
      setIsConfirming(false);
    }
  };

  return (
    <Modal
      id={overlayId}
      isOpen={isOpen}
      onClose={handleModalClose}
      className="max-w-xs rounded-2xl border-0 p-5 shadow-xl"
    >
      <h2 className="text-foreground text-lg font-semibold">{AUTHOR_BLOCK_CONFIRM_TITLE}</h2>
      <p className="text-muted-foreground mt-2 text-sm">{AUTHOR_BLOCK_CONFIRM_DESCRIPTION}</p>

      <div className="mt-5 flex justify-center">
        <div className="flex w-full min-w-0 flex-wrap gap-2">
          <Button
            variant="neutral"
            className={DIALOG_BUTTON_CLASS_NAME}
            disabled={isConfirming}
            onClick={handleModalClose}
          >
            {AUTHOR_BLOCK_CANCEL_ACTION}
          </Button>
          <Button
            variant="danger"
            className={DIALOG_BUTTON_CLASS_NAME}
            disabled={isConfirming}
            onClick={() => {
              void handleConfirmButtonClick();
            }}
          >
            {AUTHOR_BLOCK_CONFIRM_ACTION}
          </Button>
        </div>
      </div>
    </Modal>
  );
}
