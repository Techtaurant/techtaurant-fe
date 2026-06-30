'use client';

import { X } from 'lucide-react';
import { useState } from 'react';

import type { UserResponse } from '@/entities/user';
import { useGetUserProfileImage, UserAvatar, useSearchUsers } from '@/entities/user';
import { POST_LIST_FILTER_SEARCH_DEBOUNCE_DELAY_MS } from '@/features/post-list-filter/config/constants';
import { usePostListFilters } from '@/features/post-list-filter/model/use-post-list-filters';
import { UserSearchResultList } from '@/features/post-list-filter/ui/user-search-result-list';
import { cn } from '@/shared/lib/cn';
import { useDebouncedValue } from '@/shared/lib/use-debounced-value';
import { Button } from '@/shared/ui/button';
import { SearchInput } from '@/shared/ui/search-input';

export function PostUserSearchFilter() {
  const [searchUserName, setSearchUserName] = useState('');
  const trimmedSearchUserName = searchUserName.trim();
  const debouncedSearchUserName = useDebouncedValue({
    delayMs: POST_LIST_FILTER_SEARCH_DEBOUNCE_DELAY_MS,
    value: trimmedSearchUserName,
  });
  const shouldSearchUsers = trimmedSearchUserName.length > 0;

  const { filters, setAuthorFilter } = usePostListFilters();
  const { data: selectedUserProfile } = useGetUserProfileImage({ userId: filters.authorId });
  const { data: users = [], isFetching } = useSearchUsers({
    enabled: shouldSearchUsers,
    name: debouncedSearchUserName,
  });
  const shouldShowUserSearchResults = trimmedSearchUserName.length > 0 && users.length > 0;
  const isSearchingUsers = shouldSearchUsers && isFetching;

  const handleSearchInputEnter = () => {
    if (trimmedSearchUserName !== debouncedSearchUserName) return;

    const selectedUser = users.find((user) => user.name === trimmedSearchUserName);

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
          <Button
            variant="ghost"
            size="sm"
            className="hover:bg-muted h-auto w-full justify-start rounded-none px-2 py-1.5 text-left text-xs font-normal"
            onClick={deleteSelectedUser}
          >
            <UserAvatar
              name={selectedUserProfile.authorName}
              profileImageUrl={selectedUserProfile.profileImageUrl}
              className="h-5 w-5 shrink-0"
            />
            <span className="text-foreground min-w-0 flex-1 truncate">{selectedUserProfile.authorName}</span>
            <X className="text-muted-foreground h-3.5 w-3.5 shrink-0" aria-hidden />
          </Button>
        </div>
      )}
      {shouldShowUserSearchResults && (
        <div className="bg-button-neutral-surface-hover overflow-hidden rounded-lg shadow-sm">
          <div className={cn('transition-opacity', isSearchingUsers && 'opacity-60')}>
            <UserSearchResultList users={users} selectedAuthorId={filters.authorId} onUserSelect={handleUserSelect} />
          </div>
        </div>
      )}
    </section>
  );
}
