'use client';

import type { HTMLAttributes } from 'react';

import { cn } from '@/shared/lib/cn';
import { useOutsideClick } from '@/shared/lib/use-outside-click';
import { useDropdownContext } from '@/shared/ui/dropdown/providers/dropdown-provider';

type Props = HTMLAttributes<HTMLDivElement>;

export function DropdownRoot({ children, className, ...props }: Props) {
  const { isOpen, setIsOpen, triggerRef, contentRef } = useDropdownContext();

  useOutsideClick({
    enabled: isOpen,
    refs: [triggerRef, contentRef],
    callbackFn: () => setIsOpen(false),
  });

  return (
    <div className={cn('relative inline-block', className)} {...props}>
      {children}
    </div>
  );
}
