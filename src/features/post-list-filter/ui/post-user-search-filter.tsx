'use client';

import { X } from 'lucide-react';

import { UserAvatar } from '@/entities/user';
import { usePostUserSearchFilter } from '@/features/post-list-filter/model/use-post-user-search-filter';
import { UserSearchResultList } from '@/features/post-list-filter/ui/user-search-result-list';
import { SearchInput } from '@/shared/ui/search-input';

export function PostUserSearchFilter() {
  const {
    handleAuthorClear,
    handleFirstUserSelect,
    handleUserSearchInputFocus,
    handleUserSearchQueryChange,
    handleUserSelect,
    isPending,
    selectedAuthorId,
    selectedAuthorToShow,
    shouldShowUserSearchResults,
    userSearchInputValue,
    users,
  } = usePostUserSearchFilter();

  return (
    <section className="space-y-3">
      <h3 className="text-foreground text-sm font-semibold">사용자</h3>
      <SearchInput
        value={userSearchInputValue}
        hasClearButton={false}
        onValueChange={handleUserSearchQueryChange}
        onEnter={handleFirstUserSelect}
        onFocus={handleUserSearchInputFocus}
        placeholder="사용자 검색"
      />
      {selectedAuthorToShow && (
        <div className="bg-button-neutral-surface-hover overflow-hidden rounded-lg shadow-sm">
          <button
            type="button"
            className="hover:bg-muted flex w-full items-center gap-2 px-2 py-1.5 text-left text-xs transition-colors"
            aria-label="작성자 필터 해제"
            onClick={handleAuthorClear}
          >
            <UserAvatar
              name={selectedAuthorToShow.name}
              profileImageUrl={selectedAuthorToShow.profileImageUrl}
              className="h-5 w-5 shrink-0"
            />
            <span className="text-foreground min-w-0 flex-1 truncate">{selectedAuthorToShow.name}</span>
            <X className="text-muted-foreground h-3.5 w-3.5 shrink-0" aria-hidden />
          </button>
        </div>
      )}
      {shouldShowUserSearchResults && (
        <div className="bg-button-neutral-surface-hover overflow-hidden rounded-lg shadow-sm">
          {isPending ? (
            <p className="text-muted-foreground px-2.5 py-2 text-xs">검색 중입니다.</p>
          ) : (
            <UserSearchResultList
              users={users}
              selectedAuthorId={selectedAuthorId}
              onAuthorClear={handleAuthorClear}
              onUserSelect={handleUserSelect}
            />
          )}
        </div>
      )}
    </section>
  );
}
