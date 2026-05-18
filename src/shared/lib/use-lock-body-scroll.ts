'use client';

import { useEffect } from 'react';

type Params = {
  enabled: boolean;
};

export const useLockBodyScroll = ({ enabled }: Params) => {
  useEffect(() => {
    if (!enabled) return;

    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    return () => {
      document.body.style.overflow = originalOverflow;
    };
  }, [enabled]);
};
