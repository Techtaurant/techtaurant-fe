'use client';

import { overlay } from 'overlay-kit';

import { useGetMe } from '@/entities/user';
import { ProfileEditModal } from '@/features/setting/ui/profile-edit-modal';

export const useOpenProfileEditModal = () => {
  const { data: me } = useGetMe();

  const openProfileEditModal = () => {
    if (!me) return;

    return overlay.open(({ overlayId, isOpen, unmount }) => (
      <ProfileEditModal
        overlayId={overlayId}
        isOpen={isOpen}
        name={me.name}
        profileImageUrl={me.profileImageUrl}
        onClose={unmount}
      />
    ));
  };

  return openProfileEditModal;
};
