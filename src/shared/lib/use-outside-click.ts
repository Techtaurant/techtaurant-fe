'use client';

import type { RefObject } from 'react';
import { useEffect } from 'react';

type Params = {
  enabled?: boolean;
  refs: (RefObject<HTMLElement | null> | null)[];
  callbackFn: () => void;
};

export const useOutsideClick = ({ enabled = true, refs, callbackFn }: Params) => {
  useEffect(() => {
    if (!enabled) return;

    const handleOutsideClick = (event: MouseEvent) => {
      const target = event.target as Node;
      const isInside = refs.some((ref) => ref?.current?.contains(target));

      if (!isInside) callbackFn();
    };

    document.addEventListener('click', handleOutsideClick);

    return () => {
      document.removeEventListener('click', handleOutsideClick);
    };
  }, [callbackFn, enabled, refs]);
};
