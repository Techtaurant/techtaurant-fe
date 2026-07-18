const BLOCKED_POST_TITLE = '차단된 사용자의 글입니다.';
const BLOCKED_POST_DESCRIPTION = '차단한 사용자의 게시글은 표시하지 않습니다.';

export function PostListBlockedItem() {
  return (
    <article className="border-border h-[183px] w-full border-b py-6">
      <div className="relative h-full overflow-hidden rounded-lg">
        <div className="bg-muted/70 pointer-events-none absolute inset-0 blur-sm">
          <div className="flex h-full flex-col justify-center gap-3 px-4 py-5">
            <div className="bg-muted-foreground/20 h-4 w-32 rounded" />
            <div className="bg-muted-foreground/20 h-5 w-3/5 rounded" />
            <div className="bg-muted-foreground/15 h-4 w-4/5 rounded" />
          </div>
        </div>
        <div className="bg-background/75 absolute inset-0 flex flex-col items-center justify-center px-4 text-center backdrop-blur-[2px]">
          <p className="text-foreground text-sm font-semibold">{BLOCKED_POST_TITLE}</p>
          <p className="text-muted-foreground mt-1 text-sm">{BLOCKED_POST_DESCRIPTION}</p>
        </div>
      </div>
    </article>
  );
}
