'use client';

import { useDeferredValue, useState } from 'react';

import type { UserProfileImageResponse, UserResponse } from '@/entities/user';
import { useGetUserProfileImage, useSearchUsers } from '@/entities/user';
import { usePostListFilters } from '@/features/post-list-filter/model/use-post-list-filters';

type SelectedAuthor = Pick<UserResponse, 'id' | 'name' | 'profileImageUrl'>;

type UseSelectedAuthorFromFilterParams = {
  authorId?: string;
  selectedAuthor?: SelectedAuthor;
};

type UseUserSearchResultsParams = {
  isOpen: boolean;
  searchQuery: string;
};

const toSelectedAuthor = (userProfileImage: UserProfileImageResponse): SelectedAuthor => ({
  id: userProfileImage.userId,
  name: userProfileImage.authorName,
  profileImageUrl: userProfileImage.profileImageUrl,
});

const useSelectedAuthorFromFilter = ({ authorId, selectedAuthor }: UseSelectedAuthorFromFilterParams) => {
  const { data: restoredAuthorProfile } = useGetUserProfileImage({
    userId: authorId,
  });
  const restoredAuthor =
    restoredAuthorProfile && restoredAuthorProfile.userId === authorId
      ? toSelectedAuthor(restoredAuthorProfile)
      : undefined;

  return selectedAuthor?.id === authorId ? selectedAuthor : restoredAuthor;
};

const useUserSearchResults = ({ isOpen, searchQuery }: UseUserSearchResultsParams) => {
  const deferredUserSearchQuery = useDeferredValue(searchQuery);
  const shouldShowUserSearchResults = isOpen && deferredUserSearchQuery.length > 0;

  const { data: users = [], isPending } = useSearchUsers({
    enabled: shouldShowUserSearchResults,
    name: deferredUserSearchQuery,
  });

  return {
    isPending,
    shouldShowUserSearchResults,
    users,
  };
};

export const usePostUserSearchFilter = () => {
  const [userSearchQuery, setUserSearchQuery] = useState<string>();
  const [isUserSearchResultOpen, setIsUserSearchResultOpen] = useState(false);
  const [selectedAuthor, setSelectedAuthor] = useState<SelectedAuthor>();

  const { filters, setAuthorFilter } = usePostListFilters();
  const selectedAuthorFromFilter = useSelectedAuthorFromFilter({
    authorId: filters.authorId,
    selectedAuthor,
  });
  const userSearchInputValue = userSearchQuery ?? selectedAuthorFromFilter?.name ?? '';
  const trimmedUserSearchQuery = userSearchInputValue.trim();
  const { isPending, shouldShowUserSearchResults, users } = useUserSearchResults({
    isOpen: isUserSearchResultOpen,
    searchQuery: trimmedUserSearchQuery,
  });
  const isSelectedAuthorApplied = !!filters.authorId && selectedAuthorFromFilter?.id === filters.authorId;
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
