'use client';

import { useEffect, useRef } from 'react';

import { cn } from '@/shared/lib/cn';
import { useIntersectionObserver } from '@/shared/ui/intersection-observer/hooks/use-intersection-observer';

type Props = {
  onEnter?: () => Promise<void> | void;
  onLeave?: () => Promise<void> | void;
  threshold?: number;
  className?: string;
};

export function Observer({ onEnter, onLeave, threshold, className }: Props) {
  const observerRef = useRef<HTMLDivElement>(null);
  const { observe, unobserve } = useIntersectionObserver({ onEnter, onLeave, threshold });

  useEffect(() => {
    const element = observerRef.current;
    if (!element) return;

    observe(element);

    return () => {
      unobserve(element);
    };
  }, [observe, unobserve]);

  return <div ref={observerRef} className={cn('h-2.5 w-full', className)} />;
}
