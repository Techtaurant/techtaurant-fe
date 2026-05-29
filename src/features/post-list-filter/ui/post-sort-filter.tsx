'use client';

import { usePathname, useRouter, useSearchParams } from 'next/navigation';

import { buildPostListSearchParams, parsePostListFilters, type PostListSortFilter } from '@/entities/post-list';
import { POST_SORT_OPTIONS } from '@/features/post-list-filter/config/post-sort-options';
import { cn } from '@/shared/lib/cn';

const getSortClassName = (isActive: boolean) =>
  cn(
    'text-sm transition-colors hover:text-foreground',
    isActive ? 'font-semibold text-foreground' : 'text-muted-foreground',
  );

export function PostSortFilter() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const filters = parsePostListFilters(searchParams);

  const handleSortChange = (sort: PostListSortFilter) => {
    const nextSearchParams = buildPostListSearchParams(searchParams, { sort });
    router.push(`${pathname}?${nextSearchParams.toString()}`);
  };

  return (
    <div className="flex flex-wrap gap-3">
      {POST_SORT_OPTIONS.map((option) => (
        <button
          key={option.value}
          type="button"
          className={getSortClassName(filters.sort === option.value)}
          onClick={() => handleSortChange(option.value)}
        >
          {option.label}
        </button>
      ))}
    </div>
  );
}
