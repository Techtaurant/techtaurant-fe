'use client';

import type { UserResponse } from '@/entities/user';
import { UserAvatar } from '@/entities/user';

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
          <button
            key={user.id}
            type="button"
            className="hover:bg-muted flex w-full items-center gap-2 px-2 py-1.5 text-left text-xs transition-colors"
            aria-label={`${user.name} 작성자로 필터링`}
            onClick={() => onUserSelect(user)}
          >
            <UserAvatar name={user.name} profileImageUrl={user.profileImageUrl} className="h-5 w-5 shrink-0" />
            <span className="text-foreground min-w-0 flex-1 truncate">{user.name}</span>
          </button>
        ))}
    </div>
  );
}
