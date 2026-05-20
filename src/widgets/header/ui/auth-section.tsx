'use client';

import { useGetMe } from '@/entities/user/model/use-get-me';
import { LoginButton } from '@/features/auth/ui/login-button';

import { UserMenu } from './user-menu';

export function AuthSection() {
  const me = useGetMe();

  if (me === null) {
    return <LoginButton />;
  }

  return <UserMenu user={me} />;
}
