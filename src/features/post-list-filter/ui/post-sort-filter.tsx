'use client';

import { POST_SORT_OPTIONS } from '@/features/post-list-filter/config/post-sort-options';
import { usePostListFilters } from '@/features/post-list-filter/model/use-post-list-filters';
import { cn } from '@/shared/lib/cn';

export function PostSortFilter() {
  const { filters, setSortFilter } = usePostListFilters();

  return (
    <div className="flex flex-wrap gap-3">
      {POST_SORT_OPTIONS.map((option) => (
        <button
          key={option.value}
          type="button"
          className={cn(
            'hover:text-foreground text-sm transition-colors',
            filters.sort === option.value ? 'text-foreground font-semibold' : 'text-muted-foreground',
          )}
          onClick={() => setSortFilter(option.value)}
        >
          {option.label}
        </button>
      ))}
    </div>
  );
}
