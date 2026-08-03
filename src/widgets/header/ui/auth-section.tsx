'use client';

import { useGetMe } from '@/entities/user';
import { LoginButton } from '@/features/auth/ui/login-button';
import { HeaderAuthSkeleton } from '@/widgets/header/ui/header-auth-skeleton';
import { UserMenu } from '@/widgets/header/ui/user-menu';

export function AuthSection() {
  const { data: me, isPending } = useGetMe();

  if (isPending) {
    return <HeaderAuthSkeleton />;
  }

  if (!me) {
    return <LoginButton />;
  }

  return <UserMenu user={me} />;
}
