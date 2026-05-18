'use client';

import { useQuery } from '@tanstack/react-query';

import { meQueryOptions } from '@/entities/user';
import { LoginButton } from '@/features/auth/ui/login-button';
import { UserMenu } from '@/widgets/header/ui/user-menu';

export function AuthSection() {
  const { data: me } = useQuery(meQueryOptions());

  if (!me) {
    return <LoginButton />;
  }

  return <UserMenu user={me} />;
}
