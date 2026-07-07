'use client';

import { useEffect, useState } from 'react';

import { ToastSubject } from '@/shared/ui/toast/class/toast-subject';
import type { Toast } from '@/shared/ui/toast/types/toast-types';

export const useToastSubscribe = () => {
  const [toastList, setToastList] = useState<Toast[]>([]);

  useEffect(() => {
    const timerSet = new Set<ReturnType<typeof setTimeout>>();
    const toastSubject = ToastSubject.getInstance();

    const toastObserver = (toast: Toast) => {
      setToastList((prevToastList) => [...prevToastList, toast]);

      const newTimer = setTimeout(() => {
        setToastList((prevToastList) => prevToastList.filter(({ id }) => id !== toast.id));
        timerSet.delete(newTimer);
      }, toast.options.duration);

      timerSet.add(newTimer);
    };

    toastSubject.subscribe(toastObserver);

    return () => {
      toastSubject.unsubscribe(toastObserver);
      timerSet.forEach((timer) => clearTimeout(timer));
    };
  }, []);

  return toastList;
};
