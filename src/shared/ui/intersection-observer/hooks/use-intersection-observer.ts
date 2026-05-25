'use client';

import { useEffect, useRef } from 'react';

import { IS_SERVER } from '@/shared/config';

type Params = {
  onEnter?: () => Promise<void> | void;
  onLeave?: () => Promise<void> | void;
  threshold?: number;
};

export const useIntersectionObserver = ({ onEnter, onLeave, threshold = 0.2 }: Params) => {
  const observerRef = useRef<IntersectionObserver | null>(null);
  const onEnterRef = useRef(onEnter);
  const onLeaveRef = useRef(onLeave);

  // 최신 onEnter, onLeave 유지 (callback ref)
  useEffect(() => {
    onEnterRef.current = onEnter;
    onLeaveRef.current = onLeave;
  }, [onEnter, onLeave]);

  useEffect(() => {
    if (IS_SERVER) return;

    const observer = new IntersectionObserver(
      ([{ isIntersecting }]) => {
        const callbackFn = isIntersecting ? onEnterRef.current : onLeaveRef.current;
        callbackFn?.();
      },
      { threshold },
    );

    observerRef.current = observer;

    return () => {
      observer.disconnect();
      observerRef.current = null;
    };
  }, [threshold]);

  const observe = (element: Element | undefined) => {
    if (!element) return;
    observerRef.current?.observe(element);
  };

  const unobserve = (element: Element | undefined) => {
    if (!element) return;
    observerRef.current?.unobserve(element);
  };

  return { observe, unobserve };
};
