'use client';

import { usePathname, useRouter, useSearchParams } from 'next/navigation';

import { buildPostListSearchParams, parsePostListFilters, type PostListPeriodFilter } from '@/entities/post-list';
import { POST_PERIOD_OPTIONS } from '@/features/post-list-filter/config/post-period-options';
import { cn } from '@/shared/lib/cn';
import { Button } from '@/shared/ui/button';

export function PostPeriodFilter() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const filters = parsePostListFilters(searchParams);

  const handlePeriodChange = (period: PostListPeriodFilter) => {
    const nextSearchParams = buildPostListSearchParams(searchParams, { period });
    router.push(`${pathname}?${nextSearchParams.toString()}`);
  };

  return (
    <div className="flex flex-wrap gap-2">
      {POST_PERIOD_OPTIONS.map((option) => (
        <Button
          key={option.value}
          variant="ghost"
          size="sm"
          className={cn(
            'h-7 rounded-full px-2.5',
            filters.period === option.value
              ? 'bg-muted text-foreground hover:bg-muted font-semibold'
              : 'text-muted-foreground hover:bg-muted hover:text-foreground',
          )}
          onClick={() => handlePeriodChange(option.value)}
        >
          {option.label}
        </Button>
      ))}
    </div>
  );
}
