'use client';

import type { ButtonHTMLAttributes } from 'react';

import { cn } from '@/shared/lib/cn';
import { useDropdownContext } from '@/shared/ui/dropdown/providers/dropdown-provider';

type Props = Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'onClick'>;

export function DropdownTrigger({ children, className, ...props }: Props) {
  const { setIsOpen, triggerRef } = useDropdownContext();

  return (
    <button
      ref={triggerRef}
      onClick={() => setIsOpen((isOpen) => !isOpen)}
      className={cn('inline-flex items-center justify-center', className)}
      {...props}
    >
      {children}
    </button>
  );
}
