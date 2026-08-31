'use client';

import { cn } from '@/shared/lib/cn';
import { Button } from '@/shared/ui/button';

type Props = {
  isDraftSaving: boolean;
  onDraftSaveClick: () => void;
  onExitClick: () => void;
};

export function PostWriteActions({ isDraftSaving, onDraftSaveClick, onExitClick }: Props) {
  return (
    <div className={cn('flex w-full items-center justify-between gap-3')}>
      <Button className={cn('shrink-0 font-semibold')} onClick={onExitClick} size="lg" variant="neutral">
        나가기
      </Button>

      <Button
        className={cn('shrink-0 font-semibold')}
        disabled={isDraftSaving}
        onClick={onDraftSaveClick}
        size="lg"
        variant="neutral"
      >
        {isDraftSaving ? '저장 중...' : '임시저장'}
      </Button>
    </div>
  );
}
