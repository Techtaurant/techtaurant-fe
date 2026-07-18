import { ToastSubject } from '@/shared/ui/toast/class/toast-subject';
import { DEFAULT_TOAST_DURATION } from '@/shared/ui/toast/constants/toast-constants';
import type { Toast, ToastCreateOptions, ToastVariant } from '@/shared/ui/toast/types/toast-types';

const publishToast = (message: string, variant: ToastVariant, options?: ToastCreateOptions) => {
  const toastSubject = ToastSubject.getInstance();
  const nextToast: Toast = {
    message,
    options: {
      duration: options?.duration ?? DEFAULT_TOAST_DURATION,
      variant,
    },
  };

  toastSubject.notify(nextToast);
};

export const toast = {
  success: (message: string, options?: ToastCreateOptions) => {
    publishToast(message, 'success', options);
  },
  error: (message: string, options?: ToastCreateOptions) => {
    publishToast(message, 'error', options);
  },
  blocked: (message: string, options?: ToastCreateOptions) => {
    publishToast(message, 'blocked', options);
  },
};
