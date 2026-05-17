'use client';

import { OverlayProvider } from 'overlay-kit';
import type { PropsWithChildren } from 'react';

import { ModalScrollLock } from '@/shared/ui/modal/components/modal-scroll-lock';

export function ModalProvider({ children }: PropsWithChildren) {
  return (
    <OverlayProvider>
      <ModalScrollLock>{children}</ModalScrollLock>
    </OverlayProvider>
  );
}
