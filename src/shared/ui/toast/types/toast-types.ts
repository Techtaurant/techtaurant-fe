export type ToastVariant = 'success' | 'error' | 'blocked';

export type ToastCreateOptions = {
  duration?: number;
};

export type Toast = {
  message: string;
  options: {
    duration: number;
    variant: ToastVariant;
  };
};

export type ToastObserver = (toast: Toast) => void;
