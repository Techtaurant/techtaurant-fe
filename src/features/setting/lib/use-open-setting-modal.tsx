'use client';

import { overlay } from 'overlay-kit';

import { SettingModal } from '@/features/setting/ui/setting-modal';

export const useOpenSettingModal = () => {
  const openSettingModal = () => {
    return overlay.open(({ overlayId, isOpen, unmount }) => (
      <SettingModal overlayId={overlayId} isOpen={isOpen} onClose={unmount} />
    ));
  };

  return openSettingModal;
};
