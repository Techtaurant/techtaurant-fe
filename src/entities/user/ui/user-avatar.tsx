import Image from 'next/image';

import { cn } from '@/shared/lib/cn';

type Props = {
  name: string;
  profileImageUrl: string;
  className?: string;
  fallbackClassName?: string;
  unoptimized?: boolean;
};

export function UserAvatar({ className, name, profileImageUrl, fallbackClassName, unoptimized }: Props) {
  const hasProfileImageUrl = profileImageUrl.trim().length > 0;
  const fallbackText = name.charAt(0).toUpperCase() || '?';

  return (
    <div
      className={cn(
        'relative flex h-9 w-9 items-center justify-center overflow-hidden rounded-full',
        hasProfileImageUrl ? 'bg-button-neutral-surface' : 'bg-muted/80 text-muted-foreground',
        className,
      )}
    >
      {hasProfileImageUrl ? (
        <Image src={profileImageUrl} alt={name} fill unoptimized={unoptimized ?? false} className="object-cover" />
      ) : (
        <span className={cn('text-xs font-medium', fallbackClassName)}>{fallbackText}</span>
      )}
    </div>
  );
}
