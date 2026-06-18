import { PostTagFilter, PostUserSearchFilter } from '@/features/post-list-filter';
import { cn } from '@/shared/lib/cn';

export function PostListSidebar() {
  return (
    <aside className={cn('border-border hidden min-h-[calc(100dvh-7rem)] w-64 shrink-0 border-r pr-5', 'lg:block')}>
      <div className="scrollbar-hidden sticky top-20 max-h-[calc(100dvh-5rem)] space-y-7 overflow-y-auto overscroll-contain pr-2 pb-6 [overflow-anchor:none]">
        <PostUserSearchFilter />
        <PostTagFilter />
      </div>
    </aside>
  );
}
