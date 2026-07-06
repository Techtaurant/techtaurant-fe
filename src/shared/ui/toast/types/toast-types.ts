export type ToastVariant = 'success' | 'error' | 'blocked';

export type ToastCreateOptions = {
  duration?: number;
};

export type Toast = {
  id: string;
  message: string;
  options: {
    duration: number;
    variant: ToastVariant;
  };
};

export type ToastObserver = (toast: Toast) => void;
