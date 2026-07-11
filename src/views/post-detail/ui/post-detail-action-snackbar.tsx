'use client';

import { Check, User, X } from 'lucide-react';

import type { PostDetailActionSnackbarVariant } from '@/views/post-detail/model/use-post-detail-action-snackbar';

type Props = {
  isOpen: boolean;
  message: string;
  variant: PostDetailActionSnackbarVariant;
};

// TODO: 토스트 UI는 추후 별도 PR에서 변경합니다.
export function PostDetailActionSnackbar({ isOpen, message, variant }: Props) {
  if (!isOpen) return null;

  return (
    <div className="fixed top-20 left-1/2 z-[430] w-[min(400px,92vw)] -translate-x-1/2">
      <div className="bg-toast-surface flex h-[36.3px] w-full items-center justify-between gap-2 rounded-lg px-3 text-white shadow-lg">
        <div className="flex min-w-0 items-center gap-2">
          <SnackbarIcon variant={variant} />
          <p className="truncate text-sm font-semibold text-white">{message}</p>
        </div>
      </div>
    </div>
  );
}

function SnackbarIcon({ variant }: { variant: PostDetailActionSnackbarVariant }) {
  if (variant === 'blocked') {
    return (
      <span className="text-toast-block-icon relative inline-flex h-5 w-5 items-center justify-center">
        <User className="h-4 w-4" />
        <X className="text-toast-block-badge absolute -top-0.5 -right-0.5 h-2.5 w-2.5" />
      </span>
    );
  }

  if (variant === 'error') {
    return (
      <span className="bg-toast-error-icon-surface inline-flex h-4 w-4 items-center justify-center rounded-full text-white">
        <X className="h-3 w-3" strokeWidth={3} />
      </span>
    );
  }

  if (variant === 'followed' || variant === 'success') {
    return (
      <span className="bg-toast-success-icon-surface inline-flex h-4 w-4 items-center justify-center rounded-full text-white">
        <Check className="h-3 w-3" strokeWidth={3} />
      </span>
    );
  }

  return null;
}
