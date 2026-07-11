import Link from 'next/link';

import { PostDetailContainer } from '@/views/post-detail/ui/post-detail-container';

const BLOCKED_POST_TITLE = '차단한 사용자의 게시글입니다.';
const BLOCKED_POST_DESCRIPTION = '차단한 사용자가 작성한 게시글은 표시하지 않습니다.';
const POST_LIST_LINK_LABEL = '목록으로 이동';

export function PostDetailBlockedFallback() {
  return (
    <PostDetailContainer>
      <div className="flex min-h-80 flex-col items-center justify-center text-center">
        <p className="text-foreground text-lg font-semibold">{BLOCKED_POST_TITLE}</p>
        <p className="text-muted-foreground mt-2 text-sm">{BLOCKED_POST_DESCRIPTION}</p>
        <Link
          href="/posts"
          className="bg-button-neutral-surface text-foreground hover:bg-button-neutral-surface-hover mt-5 inline-flex h-8 items-center justify-center gap-2 rounded-lg px-3 text-sm font-medium transition-colors focus-visible:outline-none"
        >
          {POST_LIST_LINK_LABEL}
        </Link>
      </div>
    </PostDetailContainer>
  );
}
