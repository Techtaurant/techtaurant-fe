import { cva } from 'class-variance-authority';

import type { PostListTagResponse } from '@/shared/api/generated';
import { cn } from '@/shared/lib/cn';

const COMPACT_VISIBLE_TAG_COUNT = 4;

type PostTagListVariant = 'compact' | 'detail';

type Props = {
  tags: PostListTagResponse[];
  variant?: PostTagListVariant;
};

export function PostTagList({ tags, variant = 'compact' }: Props) {
  if (tags.length <= 0) {
    return null;
  }

  const visibleTags = getVisiblePostTags({ tags, variant });
  const hiddenTagCount = getHiddenPostTagCount({ tags, variant });
  const shouldShowTagPrefix = variant === 'compact';

  return (
    <ul className={cn(postTagListVariants({ variant }))}>
      {visibleTags.map((tag) => (
        <li key={tag.id} className={cn(postTagItemVariants({ variant }))}>
          {shouldShowTagPrefix && '#'}
          {tag.name}
        </li>
      ))}
      {hiddenTagCount > 0 && <li className={cn(postTagItemVariants({ variant }))}>+{hiddenTagCount}</li>}
    </ul>
  );
}

const getVisiblePostTags = ({ tags, variant }: { tags: PostListTagResponse[]; variant: PostTagListVariant }) => {
  if (variant === 'compact') return tags.slice(0, COMPACT_VISIBLE_TAG_COUNT);

  return tags;
};

const getHiddenPostTagCount = ({ tags, variant }: { tags: PostListTagResponse[]; variant: PostTagListVariant }) => {
  if (variant !== 'compact') return 0;

  return Math.max(0, tags.length - COMPACT_VISIBLE_TAG_COUNT);
};

const postTagListVariants = cva('flex flex-wrap', {
  variants: {
    variant: {
      compact: cn('items-center gap-1.5', 'md:gap-2'),
      detail: 'mt-2.5 gap-2',
    },
  },
  defaultVariants: {
    variant: 'compact',
  },
});

const postTagItemVariants = cva('bg-muted/85 font-semibold text-blue-500 transition-colors duration-200', {
  variants: {
    variant: {
      compact: cn('rounded-sm px-1 py-0.5 text-xs', 'hover:bg-muted/30 hover:text-blue-400', 'md:px-1.5'),
      detail: cn('rounded-full px-2.5 py-1 text-sm', 'hover:bg-muted/30 hover:text-blue-400'),
    },
  },
  defaultVariants: {
    variant: 'compact',
  },
});
