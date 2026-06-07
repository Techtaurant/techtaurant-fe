'use client';

import { overlay } from 'overlay-kit';

import { BannedUsersModal } from '@/features/setting/ui/banned-users-modal';

export const useOpenBannedUsersModal = () => {
  const openBannedUsersModal = () => {
    return overlay.open(({ overlayId, isOpen, unmount }) => (
      <BannedUsersModal overlayId={overlayId} isOpen={isOpen} onClose={unmount} />
    ));
  };

  return openBannedUsersModal;
};
