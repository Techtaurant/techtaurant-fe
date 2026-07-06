'use client';

import { ToastItem } from '@/shared/ui/toast/components/toast-item';
import { useToastSubscribe } from '@/shared/ui/toast/hooks/use-toast-subscribe';

export function ToastsRoot() {
  const toastList = useToastSubscribe();

  if (toastList.length === 0) {
    return null;
  }

  return (
    <div className="pointer-events-none fixed top-20 left-1/2 z-430 flex w-[min(400px,92vw)] -translate-x-1/2 flex-col gap-2">
      {toastList.map(({ id, message, options }) => (
        <ToastItem key={id} message={message} options={options} />
      ))}
    </div>
  );
}
