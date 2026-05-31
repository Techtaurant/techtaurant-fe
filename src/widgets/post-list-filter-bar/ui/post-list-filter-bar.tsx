import { PostPeriodFilter, PostSortFilter } from '@/features/post-list-filter';
import { cn } from '@/shared/lib/cn';

export function PostListFilterBar() {
  return (
    <div
      className={cn(
        'border-border mb-4 flex flex-col gap-3 border-b pb-4',
        'md:mb-6 md:flex-row md:items-center md:justify-between',
      )}
    >
      <PostPeriodFilter />
      <PostSortFilter />
    </div>
  );
}
