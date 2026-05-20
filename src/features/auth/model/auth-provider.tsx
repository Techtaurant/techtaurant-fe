'use client';

import { createContext, type PropsWithChildren, useContext } from 'react';

import { useGetMe, type User } from '@/entities/user/model/use-get-me';

type Auth = { status: 'loading' } | { status: 'unauthenticated' } | { status: 'authenticated'; user: User };

const AuthContext = createContext<Auth | null>(null);

export function AuthProvider({ children }: PropsWithChildren) {
  const { isLoading, data } = useGetMe();

  const auth: Auth = (() => {
    if (isLoading) return { status: 'loading' };
    if (data) return { status: 'authenticated', user: data };
    return { status: 'unauthenticated' };
  })();

  return <AuthContext.Provider value={auth}>{children}</AuthContext.Provider>;
}

export const useAuth = () => {
  const authContextValue = useContext(AuthContext);
  if (!authContextValue) throw new Error('<AuthProvider> 안에서 사용 가능합니다.');

  return authContextValue;
};
