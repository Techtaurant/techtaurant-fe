'use client';

import type { HTMLAttributes } from 'react';
import { createPortal } from 'react-dom';

import { cn } from '@/shared/lib/cn';
import { type FloatingAlign, useFloatingPosition } from '@/shared/lib/use-floating-position';

import { useDropdownContext } from '../providers/dropdown-provider';

type Props = HTMLAttributes<HTMLDivElement> & {
  align?: FloatingAlign;
};

export function DropdownContent({ children, className, align = 'center', ...props }: Props) {
  const { contentRef, isOpen, triggerRef } = useDropdownContext();

  useFloatingPosition({
    enabled: isOpen,
    anchorRef: triggerRef,
    floatingRef: contentRef,
    options: { align, offsetY: 8 },
  });

  if (!isOpen) return null;

  return createPortal(
    <div
      ref={contentRef}
      className={cn(
        'border-border/80 bg-background/95 text-foreground shadow-floating-sm fixed z-50 min-w-48 overflow-hidden rounded-2xl border p-1.5 backdrop-blur-sm',
        className,
      )}
      {...props}
    >
      {children}
    </div>,
    document.body,
  );
}
