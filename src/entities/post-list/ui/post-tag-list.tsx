import type { PostListTagResponse } from '@/shared/api/generated';
import { cn } from '@/shared/lib/cn';

type Props = {
  tags: PostListTagResponse[];
};

export function PostTagList({ tags }: Props) {
  if (tags.length <= 0) {
    return null;
  }

  return (
    <ul className={cn('flex flex-wrap items-center gap-1.5', 'md:gap-2')}>
      {tags.map((tag) => (
        <li
          key={tag.id}
          className={cn(
            'bg-muted/85 rounded-sm px-1 py-0.5 text-xs font-semibold text-blue-500 transition-colors duration-200',
            'hover:bg-muted/30 hover:text-blue-400 md:px-1.5',
          )}
        >
          #{tag.name}
        </li>
      ))}
    </ul>
  );
}
