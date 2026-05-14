import { Button } from '@/shared/ui/button';

import { startGoogleLogin } from '../lib/login';

export function LoginButton() {
  return (
    <Button variant="primary" size="md" className="shrink-0" onClick={() => startGoogleLogin()}>
      로그인
    </Button>
  );
}
