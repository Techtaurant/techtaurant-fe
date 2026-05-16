'use client';

import { useAuth } from '@/features/auth/model/auth-provider';
import { LoginButton } from '@/features/auth/ui/login-button';

import { UserMenu } from './user-menu';

export function AuthSection() {
  const auth = useAuth();

  if (auth.status !== 'authenticated') {
    return <LoginButton />;
  }

  return <UserMenu user={auth.user} />;
}
