'use client';

import { ToastItem } from '@/shared/ui/toast/components/toast-item';
import { useToastSubscribe } from '@/shared/ui/toast/hooks/use-toast-subscribe';

export function ToastsRoot() {
  const toast = useToastSubscribe();

  if (!toast) {
    return null;
  }

  return (
    <div
      role="status"
      aria-live="polite"
      aria-atomic="true"
      className="pointer-events-none fixed top-20 left-1/2 z-430 w-[min(400px,92vw)] -translate-x-1/2"
    >
      <ToastItem message={toast.message} options={toast.options} />
    </div>
  );
}
