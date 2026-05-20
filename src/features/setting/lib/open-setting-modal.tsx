'use client';

import { overlay } from 'overlay-kit';

import { SettingModal } from '../ui/setting-modal';

export const openSettingModal = () => {
  overlay.open(({ overlayId, isOpen, unmount }) => (
    <SettingModal overlayId={overlayId} isOpen={isOpen} onClose={unmount} />
  ));
};
