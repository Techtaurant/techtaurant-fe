import { useOverlayData } from 'overlay-kit';
import type { PropsWithChildren } from 'react';

import { useLockBodyScroll } from '@/shared/lib/use-lock-body-scroll';

export function ModalScrollLock({ children }: PropsWithChildren) {
  const data = useOverlayData();
  const currentModalCount = Object.keys(data).length;

  useLockBodyScroll({ enabled: currentModalCount > 0 });

  return children;
}
