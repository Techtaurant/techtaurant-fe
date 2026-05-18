'use client';

import type { HTMLAttributes } from 'react';

import { cn } from '@/shared/lib/cn';

type Props = HTMLAttributes<HTMLDivElement>;

export function DropdownDivider({ className, ...props }: Props) {
  return <div className={cn('bg-border/70 my-1.5 h-px', className)} {...props} />;
}
