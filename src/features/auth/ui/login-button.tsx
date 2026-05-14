import { UserRound } from 'lucide-react';

import { cn } from '@/shared/lib/cn';
import { Button } from '@/shared/ui/button';

import { startGoogleLogin } from '../lib/login';

export function LoginButton() {
  return (
    <Button variant="primary" size="md" className="shrink-0" onClick={() => startGoogleLogin()}>
      <UserRound className="h-5 w-5" />
      <p className={cn('hidden', 'md:inline')}>로그인</p>
    </Button>
  );
}
