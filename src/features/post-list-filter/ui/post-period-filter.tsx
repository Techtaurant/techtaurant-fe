'use client';

import { POST_PERIOD_OPTIONS } from '@/features/post-list-filter/config/post-period-options';
import { usePostListFilters } from '@/features/post-list-filter/model/use-post-list-filters';
import { cn } from '@/shared/lib/cn';
import { Button } from '@/shared/ui/button';

export function PostPeriodFilter() {
  const { filters, setPeriodFilter } = usePostListFilters();

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
          onClick={() => setPeriodFilter(option.value)}
        >
          {option.label}
        </Button>
      ))}
    </div>
  );
}
