'use client';

import { UserAvatar } from '@/entities/user';
import { Button } from '@/shared/ui/button';

type Props = {
  name: string;
  profileImageUrl: string;
  isUnbanning: boolean;
  onUnban: () => void;
};

export function BannedUserItem({ name, profileImageUrl, isUnbanning, onUnban }: Props) {
  return (
    <li className="flex items-center justify-between gap-3 rounded-xl px-1 py-2">
      <div className="flex min-w-0 items-center gap-3">
        <UserAvatar name={name} profileImageUrl={profileImageUrl ?? ''} className="h-8 w-8" />
        <p className="truncate text-sm font-semibold">{name}</p>
      </div>
      <Button variant="neutral" size="sm" className="shrink-0" disabled={isUnbanning} onClick={onUnban}>
        {isUnbanning ? '처리 중...' : '차단 해제'}
      </Button>
    </li>
  );
}
