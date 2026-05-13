'use client';

import { useEffect } from 'react';

type Params = {
  key: string;
  callbackFn: () => void;
  enabled?: boolean;
};

export const useKeyDownEffect = ({ key, callbackFn, enabled = true }: Params) => {
  useEffect(() => {
    if (!enabled) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === key) callbackFn();
    };

    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [callbackFn, enabled, key]);
};
