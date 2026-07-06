'use client';

import { cva } from 'class-variance-authority';
import { Check, User, X } from 'lucide-react';

import { cn } from '@/shared/lib/cn';
import type { ToastVariant } from '@/shared/ui/toast/types/toast-types';

type Props = {
  variant: ToastVariant;
};

export function ToastIcon({ variant }: Props) {
  if (variant === 'blocked') {
    return (
      <span className={cn(toastIconVariants({ variant }))}>
        <User className="h-4 w-4" />
        <X className="text-toast-block-badge absolute -top-0.5 -right-0.5 h-2.5 w-2.5" />
      </span>
    );
  }

  if (variant === 'error') {
    return (
      <span className={cn(toastIconVariants({ variant }))}>
        <X className="h-3 w-3" strokeWidth={3} />
      </span>
    );
  }

  return (
    <span className={cn(toastIconVariants({ variant }))}>
      <Check className="h-3 w-3" strokeWidth={3} />
    </span>
  );
}

const toastIconVariants = cva('inline-flex items-center justify-center text-white', {
  variants: {
    variant: {
      success: 'bg-toast-success-icon-surface h-4 w-4 rounded-full',
      error: 'bg-toast-error-icon-surface h-4 w-4 rounded-full',
      blocked: 'text-toast-block-icon relative h-5 w-5',
    },
  },
});
