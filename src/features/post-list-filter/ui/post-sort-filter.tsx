'use client';

import { usePathname, useRouter, useSearchParams } from 'next/navigation';

import { parsePostListFilters, type PostListSortFilter } from '@/entities/post-list';
import { POST_SORT_OPTIONS } from '@/features/post-list-filter/config/post-sort-options';
import { cn } from '@/shared/lib/cn';

export function PostSortFilter() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const filters = parsePostListFilters(searchParams);

  const handleSortChange = (sort: PostListSortFilter) => {
    const nextSearchParams = new URLSearchParams(searchParams.toString());
    nextSearchParams.set('sort', sort);

    router.push(`${pathname}?${nextSearchParams.toString()}`);
  };

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
          onClick={() => handleSortChange(option.value)}
        >
          {option.label}
        </button>
      ))}
    </div>
  );
}
