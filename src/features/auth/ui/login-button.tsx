import { Button } from '@/shared/ui/button';
import { PeopleIcon } from '@/shared/ui/icons';

import { startGoogleLogin } from '../lib/login';

export function LoginButton() {
  return (
    <Button variant="primary" size="md" className="shrink-0" onClick={() => startGoogleLogin()}>
      <PeopleIcon className="h-5 w-5" />
      <p className="hidden md:inline">로그인</p>
    </Button>
  );
}
