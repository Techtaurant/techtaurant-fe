'use client';

import { ChevronRight } from 'lucide-react';

import { useGetMe, UserAvatar } from '@/entities/user';
import { useOpenBannedUsersModal } from '@/features/setting/lib/use-open-banned-users-modal';
import { useOpenProfileEditModal } from '@/features/setting/lib/use-open-profile-edit-modal';
import { cn } from '@/shared/lib/cn';

export function ManagementPanel() {
  const { data: me } = useGetMe();

  const openProfileEditModal = useOpenProfileEditModal();
  const openBannedUsersModal = useOpenBannedUsersModal();

  if (!me) return null;

  return (
    <div>
      <section>
        <h3 className="text-base font-semibold">프로필</h3>
        <button
          onClick={openProfileEditModal}
          className={cn(
            'mt-3 flex w-full items-center justify-between rounded-md px-1 py-2 text-left transition-colors',
            'hover:bg-muted',
          )}
        >
          <div className="flex min-w-0 items-center gap-3">
            <UserAvatar name={me.name} profileImageUrl={me.profileImageUrl} className="h-8 w-8" />
            <p className="truncate text-sm font-semibold">{me.name}</p>
          </div>
          <span className="text-muted-foreground ml-3 inline-flex shrink-0 items-center gap-1 text-sm font-semibold">
            편집
            <ChevronRight className="h-5 w-5" />
          </span>
        </button>
      </section>
      <section className="border-border mt-6 border-t pt-6">
        <h3 className="text-base font-semibold">관리</h3>
        <button
          onClick={openBannedUsersModal}
          className={cn(
            'mt-3 flex h-11 w-full items-center justify-between rounded-md px-1 text-left transition-colors',
            'hover:bg-muted',
          )}
        >
          <span className="text-sm font-semibold">차단한 계정</span>
          <ChevronRight className="text-muted-foreground h-5 w-5" />
        </button>
      </section>
    </div>
  );
}
