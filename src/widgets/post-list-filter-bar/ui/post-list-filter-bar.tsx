import { PostPeriodFilter, PostSortFilter } from '@/features/post-list-filter';

export function PostListFilterBar() {
  return (
    <div className="border-border mb-4 flex flex-col gap-3 border-b pb-4 md:mb-6 md:flex-row md:items-center md:justify-between">
      <PostPeriodFilter />
      <PostSortFilter />
    </div>
  );
}
