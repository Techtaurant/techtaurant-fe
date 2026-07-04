import Link from 'next/link';

import { Button } from '@/shared/ui/button';
import { PostDetailContainer } from '@/views/post-detail/ui/post-detail-container';

export function PostDetailFallback() {
  return (
    <PostDetailContainer>
      <p className="text-foreground text-lg font-semibold">게시글을 불러오지 못했습니다.</p>
      <Link href="/posts" className="mt-4 inline-flex">
        <Button size="sm" variant="neutral">
          목록으로 이동
        </Button>
      </Link>
    </PostDetailContainer>
  );
}
