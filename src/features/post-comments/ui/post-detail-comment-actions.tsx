'use client';

import { MoreVertical, Pencil } from 'lucide-react';

import { DropdownContent, DropdownItem, DropdownProvider, DropdownTrigger } from '@/shared/ui/dropdown';

type Props = {
  onEditComment: () => void;
};

const EDIT_COMMENT_LABEL = '수정';

export function PostDetailCommentActions({ onEditComment }: Props) {
  return (
    <DropdownProvider className="relative shrink-0">
      <DropdownTrigger
        type="button"
        className="text-muted-foreground hover:bg-muted hover:text-foreground h-8 w-8 rounded-full transition-colors"
      >
        <MoreVertical className="h-4 w-4" />
      </DropdownTrigger>
      <DropdownContent align="end" className="min-w-28 rounded-xl">
        <DropdownItem onClick={onEditComment}>
          <Pencil className="h-3.5 w-3.5" />
          {EDIT_COMMENT_LABEL}
        </DropdownItem>
      </DropdownContent>
    </DropdownProvider>
  );
}
