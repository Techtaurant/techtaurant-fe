'use client';

import { usePathname, useRouter, useSearchParams } from 'next/navigation';

import {
  buildPostListSearchParams,
  parsePostListFilters,
  type PostListPeriodFilter,
  type PostListSortFilter,
} from '@/entities/post-list';
import { cn } from '@/shared/lib/cn';
import { Button } from '@/shared/ui/button';

const PERIOD_OPTIONS: Array<{ label: string; value: PostListPeriodFilter }> = [
  { label: '7일', value: 'WEEK' },
  { label: '30일', value: 'MONTH' },
  { label: '365일', value: 'YEAR' },
  { label: '전체', value: 'ALL' },
];

const SORT_OPTIONS: Array<{ label: string; value: PostListSortFilter }> = [
  { label: '최신순', value: 'LATEST' },
  { label: '조회순', value: 'VIEW' },
  { label: '추천순', value: 'LIKE' },
  { label: '댓글순', value: 'COMMENT' },
];

const getButtonClassName = (isActive: boolean) =>
  cn(
    'h-7 rounded-full px-2.5',
    isActive
      ? 'bg-muted font-semibold text-foreground hover:bg-muted'
      : 'text-muted-foreground hover:bg-muted hover:text-foreground',
  );

const getSortClassName = (isActive: boolean) =>
  cn(
    'text-sm transition-colors hover:text-foreground',
    isActive ? 'font-semibold text-foreground' : 'text-muted-foreground',
  );

export function PostListFilterBar() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const filters = parsePostListFilters(searchParams);

  const handlePeriodChange = (period: PostListPeriodFilter) => {
    const nextSearchParams = buildPostListSearchParams(searchParams, { period });
    router.push(`${pathname}?${nextSearchParams.toString()}`);
  };

  const handleSortChange = (sort: PostListSortFilter) => {
    const nextSearchParams = buildPostListSearchParams(searchParams, { sort });
    router.push(`${pathname}?${nextSearchParams.toString()}`);
  };

  return (
    <div className="border-border mb-4 flex flex-col gap-3 border-b pb-4 md:mb-6 md:flex-row md:items-center md:justify-between">
      <div className="flex flex-wrap gap-2">
        {PERIOD_OPTIONS.map((option) => (
          <Button
            key={option.value}
            variant="ghost"
            size="sm"
            className={getButtonClassName(filters.period === option.value)}
            onClick={() => handlePeriodChange(option.value)}
          >
            {option.label}
          </Button>
        ))}
      </div>
      <div className="flex flex-wrap gap-3">
        {SORT_OPTIONS.map((option) => (
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
    </div>
  );
}
