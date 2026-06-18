'use client';

import { useEffect, useState } from 'react';

type Params<T> = {
  delayMs: number;
  value: T;
};

export const useDebouncedValue = <T>({ delayMs, value }: Params<T>) => {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setDebouncedValue(value);
    }, delayMs);

    return () => {
      clearTimeout(timeoutId);
    };
  }, [delayMs, value]);

  return debouncedValue;
};
