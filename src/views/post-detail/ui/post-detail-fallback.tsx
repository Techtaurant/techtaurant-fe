import Link from 'next/link';

import { PostDetailContainer } from '@/views/post-detail/ui/post-detail-container';

export function PostDetailFallback() {
  return (
    <PostDetailContainer>
      <p className="text-foreground text-lg font-semibold">게시글을 불러오지 못했습니다.</p>
      <Link
        href="/posts"
        className="bg-button-neutral-surface text-foreground hover:bg-button-neutral-surface-hover mt-4 inline-flex h-8 items-center justify-center gap-2 rounded-lg px-3 text-sm font-medium transition-colors focus-visible:outline-none"
      >
        목록으로 이동
      </Link>
    </PostDetailContainer>
  );
}
