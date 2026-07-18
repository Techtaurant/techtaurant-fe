'use client';

import { ToastIcon } from '@/shared/ui/toast/components/toast-icon';
import type { Toast } from '@/shared/ui/toast/types/toast-types';

type Props = Pick<Toast, 'message' | 'options'>;

export function ToastItem({ message, options }: Props) {
  return (
    <div className="bg-toast-surface flex h-[36.3px] w-full items-center rounded-lg px-3 text-white shadow-2xl">
      <div className="flex min-w-0 items-center gap-2">
        <ToastIcon variant={options.variant} />
        <p className="truncate text-sm font-semibold text-white">{message}</p>
      </div>
    </div>
  );
}
