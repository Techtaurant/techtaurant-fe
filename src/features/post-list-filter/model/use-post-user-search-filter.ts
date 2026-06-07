'use client';

import { useDeferredValue, useState } from 'react';

import type { UserProfileImageResponse, UserResponse } from '@/entities/user';
import { useGetUserProfileImage, useSearchUsers } from '@/entities/user';
import { usePostListFilters } from '@/features/post-list-filter/model/use-post-list-filters';

type SelectedAuthor = Pick<UserResponse, 'id' | 'name' | 'profileImageUrl'>;

const toSelectedAuthor = (userProfileImage: UserProfileImageResponse): SelectedAuthor => ({
  id: userProfileImage.userId,
  name: userProfileImage.authorName,
  profileImageUrl: userProfileImage.profileImageUrl,
});

export const usePostUserSearchFilter = () => {
  const [userSearchQuery, setUserSearchQuery] = useState<string>();
  const [isUserSearchResultOpen, setIsUserSearchResultOpen] = useState(false);
  const [selectedAuthor, setSelectedAuthor] = useState<SelectedAuthor>();

  const { filters, setAuthorFilter } = usePostListFilters();

  const { data: restoredAuthorProfile } = useGetUserProfileImage({
    userId: filters.authorId,
  });
  const restoredAuthor =
    restoredAuthorProfile && restoredAuthorProfile.userId === filters.authorId
      ? toSelectedAuthor(restoredAuthorProfile)
      : undefined;
  const selectedAuthorFromFilter = selectedAuthor?.id === filters.authorId ? selectedAuthor : restoredAuthor;
  const userSearchInputValue = userSearchQuery ?? selectedAuthorFromFilter?.name ?? '';
  const trimmedUserSearchQuery = userSearchInputValue.trim();
  const deferredUserSearchQuery = useDeferredValue(trimmedUserSearchQuery);
  const shouldShowUserSearchResults = isUserSearchResultOpen && deferredUserSearchQuery.length > 0;

  const { data: users = [], isPending } = useSearchUsers({
    enabled: shouldShowUserSearchResults,
    name: deferredUserSearchQuery,
  });
  const isSelectedAuthorApplied = Boolean(filters.authorId && selectedAuthorFromFilter?.id === filters.authorId);
  const selectedAuthorToShow =
    isSelectedAuthorApplied && !shouldShowUserSearchResults ? selectedAuthorFromFilter : undefined;

  const handleUserSearchQueryChange = (value: string) => {
    setUserSearchQuery(value);
    setIsUserSearchResultOpen(value.trim().length > 0);
  };

  const handleUserSearchInputFocus = () => {
    if (!trimmedUserSearchQuery || isSelectedAuthorApplied) return;

    setIsUserSearchResultOpen(true);
  };

  const handleUserSelect = (user: UserResponse) => {
    setSelectedAuthor(user);
    setUserSearchQuery(user.name);
    setIsUserSearchResultOpen(false);
    setAuthorFilter(user.id);
  };

  const handleAuthorClear = () => {
    setSelectedAuthor(undefined);
    setUserSearchQuery('');
    setIsUserSearchResultOpen(false);
    setAuthorFilter(undefined);
  };

  const handleFirstUserSelect = () => {
    const firstUser = users[0];

    if (!firstUser) return;

    handleUserSelect(firstUser);
  };

  return {
    handleAuthorClear,
    handleFirstUserSelect,
    handleUserSearchInputFocus,
    handleUserSearchQueryChange,
    handleUserSelect,
    isPending,
    selectedAuthorId: filters.authorId,
    selectedAuthorToShow,
    shouldShowUserSearchResults,
    userSearchInputValue,
    users,
  };
};
