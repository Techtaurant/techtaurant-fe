'use client';

import { LoaderCircle } from 'lucide-react';
import { useState } from 'react';

import { useUpdateProfile } from '@/features/setting/model/use-update-profile';
import { ProfileImageField } from '@/features/setting/ui/profile-image-field';
import { ProfileNameField } from '@/features/setting/ui/profile-name-field';
import { Button } from '@/shared/ui/button';
import { Modal, ModalHeader } from '@/shared/ui/modal';

type Props = {
  overlayId: string;
  isOpen: boolean;
  name: string;
  profileImageUrl: string;
  onClose: () => void;
};

export function ProfileEditModal({ overlayId, isOpen, name, profileImageUrl, onClose }: Props) {
  const [newName, setNewName] = useState<string>(name);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [profileImageFile, setProfileImageFile] = useState<File | null>(null);

  const updateProfile = useUpdateProfile();

  const handleClose = () => {
    if (updateProfile.isPending) return;
    onClose();
  };

  const handleFileChange = (file: File) => {
    setProfileImageFile(file);
    setErrorMessage(null);
  };

  const handleNameChange = (value: string) => {
    setNewName(value);
    setErrorMessage(null);
  };

  const handleSave = () => {
    const trimmedName = newName.trim();
    if (!trimmedName) {
      setErrorMessage('닉네임을 입력해주세요.');
      return;
    }

    setErrorMessage(null);
    updateProfile.mutate(
      { name: trimmedName, imageFile: profileImageFile },
      {
        onSuccess: () => onClose(),
        onError: () => setErrorMessage('프로필 저장에 실패했습니다. 잠시 후 다시 시도해주세요.'),
      },
    );
  };

  return (
    <Modal id={overlayId} isOpen={isOpen} onClose={handleClose}>
      <ModalHeader
        title="프로필 변경"
        description="닉네임과 프로필 이미지를 변경할 수 있습니다."
        onClose={handleClose}
        closeDisabled={updateProfile.isPending}
      />
      <div className="space-y-6 p-6">
        <ProfileImageField
          profileImageUrl={profileImageUrl}
          name={newName}
          file={profileImageFile}
          disabled={updateProfile.isPending}
          onFileChange={handleFileChange}
        />
        <ProfileNameField
          value={newName}
          maxLength={20}
          disabled={updateProfile.isPending}
          onValueChange={handleNameChange}
        />
        {errorMessage && <p className="text-sm font-medium text-red-500">{errorMessage}</p>}
      </div>
      <div className="border-border/70 grid grid-cols-2 gap-3 border-t px-6 py-4">
        <Button variant="neutral" size="lg" onClick={handleClose} disabled={updateProfile.isPending}>
          취소
        </Button>
        <Button
          variant="primarySurface"
          size="lg"
          onClick={handleSave}
          disabled={updateProfile.isPending || !newName.trim()}
        >
          {updateProfile.isPending && <LoaderCircle className="h-4 w-4 animate-spin" />}
          저장
        </Button>
      </div>
    </Modal>
  );
}
