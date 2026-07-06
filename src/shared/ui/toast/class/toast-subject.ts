import type { Toast, ToastObserver } from '@/shared/ui/toast/types/toast-types';

export class ToastSubject {
  private static instance: ToastSubject | null = null;
  private observers: ToastObserver[] = [];

  static getInstance() {
    if (!ToastSubject.instance) {
      ToastSubject.instance = new ToastSubject();
    }

    return ToastSubject.instance;
  }

  subscribe(observer: ToastObserver) {
    if (!this.observers.includes(observer)) {
      this.observers.push(observer);
    }
  }

  unsubscribe(observer: ToastObserver) {
    this.observers = this.observers.filter((currentObserver) => currentObserver !== observer);
  }

  notify(toast: Toast) {
    this.observers.forEach((observer) => observer(toast));
  }
}
