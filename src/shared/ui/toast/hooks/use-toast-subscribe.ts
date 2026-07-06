'use client';

import { useEffect, useState } from 'react';

import { ToastSubject } from '@/shared/ui/toast/class/toast-subject';
import type { Toast } from '@/shared/ui/toast/types/toast-types';

export const useToastSubscribe = () => {
  const [toastList, setToastList] = useState<Toast[]>([]);

  useEffect(() => {
    const timerList: ReturnType<typeof setTimeout>[] = [];
    const toastSubject = ToastSubject.getInstance();

    const toastObserver = (toast: Toast) => {
      setToastList((prevToastList) => [...prevToastList, toast]);

      const timer = setTimeout(() => {
        setToastList((prevToastList) => prevToastList.filter(({ id }) => id !== toast.id));
      }, toast.options.duration);

      timerList.push(timer);
    };

    toastSubject.subscribe(toastObserver);

    return () => {
      toastSubject.unsubscribe(toastObserver);
      timerList.forEach((timer) => clearTimeout(timer));
    };
  }, []);

  return toastList;
};
