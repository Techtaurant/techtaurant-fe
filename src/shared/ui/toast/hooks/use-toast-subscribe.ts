'use client';

import { useEffect, useState } from 'react';

import { ToastSubject } from '@/shared/ui/toast/class/toast-subject';
import type { Toast } from '@/shared/ui/toast/types/toast-types';

export const useToastSubscribe = () => {
  const [toast, setToast] = useState<Toast | null>(null);

  useEffect(() => {
    let timer: ReturnType<typeof setTimeout> | null = null;
    const toastSubject = ToastSubject.getInstance();

    const toastObserver = (nextToast: Toast) => {
      if (timer) {
        clearTimeout(timer);
      }

      setToast(nextToast);

      timer = setTimeout(() => {
        setToast(null);
        timer = null;
      }, nextToast.options.duration);
    };

    toastSubject.subscribe(toastObserver);

    return () => {
      toastSubject.unsubscribe(toastObserver);
      if (timer) {
        clearTimeout(timer);
      }
    };
  }, []);

  return toast;
};
