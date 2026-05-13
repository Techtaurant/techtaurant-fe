import { useOverlayData } from 'overlay-kit';
import type { PropsWithChildren } from 'react';

import { useLockBodyScroll } from '@/shared/lib/use-lock-body-scroll';

export function ModalScrollLock({ children }: PropsWithChildren) {
  const data = useOverlayData();
  const openedModalCount = Object.values(data).filter(({ isOpen }) => isOpen).length;

  useLockBodyScroll({ enabled: openedModalCount > 0 });

  return children;
}
