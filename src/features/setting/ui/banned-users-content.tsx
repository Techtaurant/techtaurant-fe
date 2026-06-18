'use client';

import { Ban } from 'lucide-react';

import { useDeleteMyBannedUser, useGetMyBannedUsers } from '@/entities/user';
import { BannedUserItem } from '@/features/setting/ui/banned-user-item';

export function BannedUsersContent() {
  const { data: bannedUsers = [], isPending } = useGetMyBannedUsers();

  const deleteMyBannedUser = useDeleteMyBannedUser();

  const unbanningUserId = deleteMyBannedUser.isPending ? deleteMyBannedUser.variables?.targetUserId : null;

  const handleUnbanClick = (targetUserId: string) => {
    if (deleteMyBannedUser.isPending) return;
    deleteMyBannedUser.mutate({ targetUserId });
  };

  if (isPending) {
    return (
      <div className="text-muted-foreground flex h-full items-center justify-center text-sm">
        차단한 계정을 불러오는 중입니다.
      </div>
    );
  }

  if (bannedUsers.length === 0) {
    return (
      <div className="text-muted-foreground flex h-full flex-col items-center justify-center gap-4">
        <div className="bg-muted rounded-xl p-3">
          <Ban className="h-7 w-7" />
        </div>
        <p className="text-sm font-medium">차단한 계정이 없어요</p>
      </div>
    );
  }

  return (
    <ul className="space-y-2">
      {bannedUsers.map((user) => (
        <BannedUserItem
          key={user.userId}
          name={user.name}
          profileImageUrl={user.profileImageUrl ?? ''}
          isUnbanning={unbanningUserId === user.userId}
          onUnban={() => handleUnbanClick(user.userId)}
        />
      ))}
    </ul>
  );
}
