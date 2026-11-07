declare global {
  const $state: <T>(value: T) => T;
  const $derived: <T>(value: T) => T;
  const $effect: (callback: () => void) => void;
}

const browser = typeof window !== 'undefined' && typeof document !== 'undefined';

class CartStore {
 
  items = $state<Record<string, number>>(
    browser ? JSON.parse(localStorage.getItem('nexora_cart') || '{}') : {}
  );

  count = $derived(Object.values(this.items).reduce((sum, qty) => sum + qty, 0));


  uniqueCount = $derived(Object.keys(this.items).length);


  isEmpty = $derived(this.count === 0);

  constructor() {

    $effect(() => {
      if (browser) {
        localStorage.setItem('nexora_cart', JSON.stringify(this.items));
      }
    });
  }


  add(id: string, quantity: number = 1) {
    if (quantity <= 0) return;
    this.items = {
      ...this.items,
      [id]: (this.items[id] ?? 0) + quantity
    };
  }

 
  remove(id: string) {
    const newItems = { ...this.items };
    delete newItems[id];
    this.items = newItems;
  }

 
  updateQuantity(id: string, quantity: number) {
    if (quantity <= 0) {
      this.remove(id);
    } else {
      this.items = {
        ...this.items,
        [id]: quantity
      };
    }
  }

  getItem(id: string): number {
    return this.items[id] ?? 0;
  }


  clear() {
    this.items = {};
  }
}


export const cart = new CartStore();