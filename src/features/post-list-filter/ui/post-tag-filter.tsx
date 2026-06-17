'use client';

import { useState } from 'react';

import { useGetTags } from '@/entities/tag';
import { POST_LIST_FILTER_SEARCH_DEBOUNCE_DELAY_MS } from '@/features/post-list-filter/config/constants';
import { usePostListFilters } from '@/features/post-list-filter/model/use-post-list-filters';
import { TagFilterList } from '@/features/post-list-filter/ui/tag-filter-list';
import { useDebouncedValue } from '@/shared/lib/use-debounced-value';
import { SearchInput } from '@/shared/ui/search-input';

export function PostTagFilter() {
  const [tagSearchQuery, setTagSearchQuery] = useState('');
  const trimmedTagSearchQuery = tagSearchQuery.trim();
  const debouncedTagSearchQuery = useDebouncedValue({
    delayMs: POST_LIST_FILTER_SEARCH_DEBOUNCE_DELAY_MS,
    value: trimmedTagSearchQuery,
  });
  const shouldSearchTags = trimmedTagSearchQuery.length > 0 && debouncedTagSearchQuery.length > 0;

  const { filters, toggleTagFilter } = usePostListFilters();

  const {
    data: tags = [],
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useGetTags({
    ...(shouldSearchTags && { params: { name: debouncedTagSearchQuery } }),
  });

  return (
    <section className="space-y-3">
      <h3 className="text-foreground text-sm font-semibold">태그</h3>
      <SearchInput value={tagSearchQuery} onValueChange={setTagSearchQuery} placeholder="태그 검색" />
      <TagFilterList
        tags={tags}
        selectedTagIds={filters.tagIds}
        hasNextPage={!!hasNextPage}
        isFetchingNextPage={isFetchingNextPage}
        onFetchNextPage={fetchNextPage}
        onToggleTag={toggleTagFilter}
      />
    </section>
  );
}
