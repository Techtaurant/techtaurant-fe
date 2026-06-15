'use client';

import { X } from 'lucide-react';
import { useState } from 'react';

import type { UserResponse } from '@/entities/user';
import { useGetUserProfileImage, UserAvatar, useSearchUsers } from '@/entities/user';
import { usePostListFilters } from '@/features/post-list-filter/model/use-post-list-filters';
import { UserSearchResultList } from '@/features/post-list-filter/ui/user-search-result-list';
import { SearchInput } from '@/shared/ui/search-input';

export function PostUserSearchFilter() {
  const [searchUserName, setSearchUserName] = useState('');
  const { filters, setAuthorFilter } = usePostListFilters();
  const { data: selectedUserProfile } = useGetUserProfileImage({ userId: filters.authorId });
  const { data: users = [], isPending } = useSearchUsers({
    name: searchUserName,
  });
  const shouldShowUserSearchResults = users.length > 0;

  const handleSearchInputEnter = () => {
    const selectedUser = users.find((user) => user.name === searchUserName);

    if (!selectedUser) return;

    setAuthorFilter(selectedUser.id);
  };

  const handleUserSelect = (user: UserResponse) => {
    setAuthorFilter(user.id);
    setSearchUserName('');
  };

  const deleteSelectedUser = () => {
    setAuthorFilter(undefined);
  };

  return (
    <section className="space-y-3">
      <h3 className="text-foreground text-sm font-semibold">사용자</h3>
      <SearchInput
        value={searchUserName}
        hasClearButton={false}
        onValueChange={setSearchUserName}
        onEnter={handleSearchInputEnter}
        placeholder="사용자 검색"
      />
      {selectedUserProfile && (
        <div className="bg-button-neutral-surface-hover overflow-hidden rounded-lg shadow-sm">
          <button
            type="button"
            className="hover:bg-muted flex w-full items-center gap-2 px-2 py-1.5 text-left text-xs transition-colors"
            aria-label="작성자 필터 해제"
            onClick={deleteSelectedUser}
          >
            <UserAvatar
              name={selectedUserProfile.authorName}
              profileImageUrl={selectedUserProfile.profileImageUrl}
              className="h-5 w-5 shrink-0"
            />
            <span className="text-foreground min-w-0 flex-1 truncate">{selectedUserProfile.authorName}</span>
            <X className="text-muted-foreground h-3.5 w-3.5 shrink-0" aria-hidden />
          </button>
        </div>
      )}
      {shouldShowUserSearchResults && (
        <div className="bg-button-neutral-surface-hover overflow-hidden rounded-lg shadow-sm">
          {!isPending && (
            <UserSearchResultList users={users} selectedAuthorId={filters.authorId} onUserSelect={handleUserSelect} />
          )}
        </div>
      )}
    </section>
  );
}
