'use client';

import { Camera } from 'lucide-react';
import { type ChangeEvent, useId } from 'react';

import { UserAvatar } from '@/entities/user';
import { cn } from '@/shared/lib/cn';
import { useFileUrl } from '@/shared/lib/use-file-url';

type Props = {
  profileImageUrl: string;
  name: string;
  file: File | null;
  disabled?: boolean;
  onFileChange: (file: File) => void;
};

export function ProfileImageField({ profileImageUrl, name, file, disabled, onFileChange }: Props) {
  const inputId = useId();
  const previewUrl = useFileUrl(file);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const newFile = e.target.files?.[0];
    if (!newFile || !newFile.type.startsWith('image/')) return;

    onFileChange(newFile);
  };

  return (
    <div className="flex flex-col items-center gap-3">
      <div className="relative h-24 w-24">
        <UserAvatar
          name={name}
          profileImageUrl={previewUrl ?? profileImageUrl}
          unoptimized={!!previewUrl}
          fallbackClassName="text-3xl font-bold"
          className="h-24 w-24"
        />
        <label
          htmlFor={inputId}
          className={cn(
            'bg-button-primary text-background absolute right-0 bottom-0 inline-flex h-8 w-8 items-center justify-center rounded-full shadow-sm transition-transform',
            disabled ? 'pointer-events-none opacity-60' : 'cursor-pointer hover:scale-105',
          )}
        >
          <Camera className="h-4 w-4" />
        </label>
      </div>
      <input
        id={inputId}
        type="file"
        accept="image/*"
        className="sr-only"
        disabled={disabled}
        onChange={handleChange}
      />
    </div>
  );
}
