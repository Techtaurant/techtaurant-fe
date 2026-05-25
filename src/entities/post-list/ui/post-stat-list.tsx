import { Eye, Heart, MessageCircleMore } from 'lucide-react';

import { cn } from '@/shared/lib/cn';

type Props = {
  viewCount: number;
  likeCount: number;
  commentCount: number;
};

export function PostStatList({ viewCount, likeCount, commentCount }: Props) {
  return (
    <ul className={cn('text-muted-foreground ml-auto flex items-center gap-3 text-xs', 'md:ml-0 md:text-sm')}>
      <li className="flex items-center gap-1">
        <Eye className="h-4 w-4" />
        <span>{viewCount.toLocaleString()}</span>
      </li>
      <li className="flex items-center gap-1">
        <Heart className="h-4 w-4" />
        <span>{likeCount.toLocaleString()}</span>
      </li>
      <li className="flex items-center gap-1">
        <MessageCircleMore className="h-4 w-4" />
        <span>{commentCount.toLocaleString()}</span>
      </li>
    </ul>
  );
}
