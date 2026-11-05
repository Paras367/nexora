export type ToastType = 'success' | 'error' | 'info' | 'warning';

export interface Toast {
  id: string;
  message: string;
  type: ToastType;
  duration?: number; // in milliseconds, default 3000
}

class ToastStore {

  toasts = $state<Toast[]>([]);


  add(toast: Omit<Toast, 'id'>) {
    // Generate a short, unique ID
    const id = Math.random().toString(36).substring(2, 9) + Date.now().toString(36);
    
    const newToast: Toast = {
      ...toast,
      id,
      duration: toast.duration ?? 3000 // Default 3 seconds
    };
    this.toasts = [...this.toasts, newToast];


    if (newToast.duration && newToast.duration > 0) {
      setTimeout(() => {
        this.remove(id);
      }, newToast.duration);
    }
  }


  remove(id: string) {
    this.toasts = this.toasts.filter((t) => t.id !== id);
  }

  /**
   * Convenience methods for different toast types
   */
  success(message: string, duration?: number) {
    this.add({ message, type: 'success', duration });
  }

  error(message: string, duration?: number) {
    this.add({ message, type: 'error', duration });
  }

  info(message: string, duration?: number) {
    this.add({ message, type: 'info', duration });
  }

  warning(message: string, duration?: number) {
    this.add({ message, type: 'warning', duration });
  }
}


export const toast = new ToastStore();