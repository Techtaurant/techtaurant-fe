'use client';

import { useGetMe } from '@/entities/user';
import { LoginButton } from '@/features/auth/ui/login-button';
import { UserMenu } from '@/widgets/header/ui/user-menu';

export function AuthSection() {
  const { data: me } = useGetMe();

  if (!me) {
    return <LoginButton />;
  }

  return <UserMenu user={me} />;
}
