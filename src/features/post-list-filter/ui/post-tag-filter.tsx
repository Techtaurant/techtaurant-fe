'use client';

import { useDeferredValue, useState } from 'react';

import { useGetTags } from '@/entities/tag';
import { usePostListFilters } from '@/features/post-list-filter/model/use-post-list-filters';
import { TagFilterList } from '@/features/post-list-filter/ui/tag-filter-list';
import { SearchInput } from '@/shared/ui/search-input';

export function PostTagFilter() {
  const [tagSearchQuery, setTagSearchQuery] = useState('');
  const trimmedTagSearchQuery = tagSearchQuery.trim();
  const deferredTagSearchQuery = useDeferredValue(trimmedTagSearchQuery);

  const { filters, toggleTagFilter } = usePostListFilters();

  const {
    data: tags = [],
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useGetTags({
    ...(!!deferredTagSearchQuery && { params: { name: deferredTagSearchQuery } }),
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
