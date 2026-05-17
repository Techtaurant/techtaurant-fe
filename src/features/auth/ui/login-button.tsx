import { UserRound } from 'lucide-react';

import { startGoogleLogin } from '@/features/auth/lib/login';
import { cn } from '@/shared/lib/cn';
import { Button } from '@/shared/ui/button';

export function LoginButton() {
  return (
    <Button variant="primary" size="md" className="shrink-0" onClick={() => startGoogleLogin()}>
      <UserRound className="h-5 w-5" />
      <p className={cn('hidden', 'md:inline')}>로그인</p>
    </Button>
  );
}
