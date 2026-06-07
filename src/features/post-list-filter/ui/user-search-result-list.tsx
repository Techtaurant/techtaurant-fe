'use client';

import { X } from 'lucide-react';

import type { UserResponse } from '@/entities/user';
import { UserAvatar } from '@/entities/user';
import { cn } from '@/shared/lib/cn';

type Props = {
  onAuthorClear: () => void;
  onUserSelect: (user: UserResponse) => void;
  selectedAuthorId?: string;
  users: UserResponse[];
};

export function UserSearchResultList({ onAuthorClear, onUserSelect, selectedAuthorId, users }: Props) {
  if (users.length <= 0) {
    return <p className="text-muted-foreground px-2.5 py-2 text-xs">검색된 사용자가 없습니다.</p>;
  }

  return (
    <div className="max-h-44 overflow-y-auto">
      {users.map((user) => {
        const isSelected = selectedAuthorId === user.id;

        return (
          <button
            key={user.id}
            type="button"
            className={cn(
              'hover:bg-muted flex w-full items-center gap-2 px-2 py-1.5 text-left text-xs transition-colors',
              isSelected && 'bg-muted',
            )}
            aria-label={isSelected ? '작성자 필터 해제' : `${user.name} 작성자로 필터링`}
            onClick={isSelected ? onAuthorClear : () => onUserSelect(user)}
          >
            <UserAvatar name={user.name} profileImageUrl={user.profileImageUrl} className="h-5 w-5 shrink-0" />
            <span className="text-foreground min-w-0 flex-1 truncate">{user.name}</span>
            {isSelected && <X className="text-muted-foreground h-3.5 w-3.5 shrink-0" aria-hidden />}
          </button>
        );
      })}
    </div>
  );
}
