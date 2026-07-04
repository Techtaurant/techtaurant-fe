'use client';

import type { UserResponse } from '@/entities/user';
import { UserAvatar } from '@/entities/user';
import { Button } from '@/shared/ui/button';

type Props = {
  onUserSelect: (user: UserResponse) => void;
  selectedAuthorId?: string;
  users: UserResponse[];
};

export function UserSearchResultList({ onUserSelect, selectedAuthorId, users }: Props) {
  return (
    <div className="max-h-44 overflow-y-auto">
      {users
        .filter((user) => user.id !== selectedAuthorId)
        .map((user) => (
          <Button
            key={user.id}
            variant="ghost"
            size="sm"
            className="hover:bg-muted h-auto w-full justify-start rounded-none px-2 py-1.5 text-left text-xs font-normal"
            onClick={() => onUserSelect(user)}
          >
            <UserAvatar name={user.name} profileImageUrl={user.profileImageUrl} className="h-5 w-5 shrink-0" />
            <span className="text-foreground min-w-0 flex-1 truncate">{user.name}</span>
          </Button>
        ))}
    </div>
  );
}
