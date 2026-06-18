'use client';

import { BannedUsersContent } from '@/features/setting/ui/banned-users-content';
import { Modal, ModalHeader } from '@/shared/ui/modal';

type Props = {
  overlayId: string;
  isOpen: boolean;
  onClose: () => void;
};

export function BannedUsersModal({ overlayId, isOpen, onClose }: Props) {
  return (
    <Modal id={overlayId} isOpen={isOpen} onClose={onClose} className="flex flex-col">
      <ModalHeader title="차단한 계정" onClose={onClose} />
      <div className="h-100 overflow-y-auto px-6 py-5">
        <BannedUsersContent />
      </div>
    </Modal>
  );
}
