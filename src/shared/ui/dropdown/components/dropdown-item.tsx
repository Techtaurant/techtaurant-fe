'use client';

import type { HTMLAttributes, MouseEvent } from 'react';

import { cn } from '@/shared/lib/cn';

import { useDropdownContext } from '../providers/dropdown-provider';

type Props = HTMLAttributes<HTMLDivElement> & {
  preventClose?: boolean;
};

export function DropdownItem({ children, className, onClick, preventClose = false, ...props }: Props) {
  const { setIsOpen } = useDropdownContext();

  const handleClick = (event: MouseEvent<HTMLDivElement>) => {
    onClick?.(event);
    if (!preventClose) setIsOpen(false);
  };

  return (
    <div
      tabIndex={0}
      onClick={handleClick}
      className={cn(
        'text-foreground flex w-full items-center gap-2 rounded-lg px-3 py-2.5 text-sm leading-none font-semibold transition-colors outline-none',
        'hover:bg-muted focus-visible:bg-muted active:bg-muted/80 select-none',
        className,
      )}
      {...props}
    >
      {children}
    </div>
  );
}
