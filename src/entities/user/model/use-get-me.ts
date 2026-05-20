'use client';

import { useEffect, useState } from 'react';

import { getMe, type UserResponse } from '@/shared/api/generated';

export type User = UserResponse;

export const useGetMe = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [data, setData] = useState<User | null>(null);

  useEffect(() => {
    (async () => {
      try {
        setIsLoading(true);
        const response = await getMe();
        if (response.status === 200) {
          setData(response.data.data ?? null);
          return;
        }
        setData(null);
      } catch {
        setData(null);
      } finally {
        setIsLoading(false);
      }
    })();
  }, []);

  return { isLoading, data };
};
