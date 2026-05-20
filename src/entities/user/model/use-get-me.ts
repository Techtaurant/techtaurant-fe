'use client';

import { useEffect, useState } from 'react';

import { getMe, type UserResponse } from '@/shared/api/generated';

export type User = UserResponse;

export const useGetMe = () => {
  const [data, setData] = useState<User | null>(null);

  useEffect(() => {
    (async () => {
      try {
        const response = await getMe();
        if (response.status === 200) {
          setData(response.data.data ?? null);
          return;
        }
        setData(null);
      } catch {
        setData(null);
      }
    })();
  }, []);

  return data;
};
