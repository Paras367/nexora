const browser = typeof window !== 'undefined';

declare function $state<T>(initial: T): T;
declare function $derived<T>(expression: T): T;

class CartStore {
  // ✅ Initialize from LocalStorage (if in browser) to persist cart across refreshes
  items = $state<Record<string, number>>(
    browser ? JSON.parse(localStorage.getItem('nexora_cart') || '{}') : {}
  );

  // ✅ Derived: Total quantity of all items (for the cart badge)
  count = $derived(Object.values(this.items).reduce((sum, qty) => sum + qty, 0));

  // ✅ Derived: Number of unique products in the cart
  uniqueCount = $derived(Object.keys(this.items).length);

  // ✅ Derived: Check if cart is empty
  isEmpty = $derived(this.count === 0);

  // ✅ Helper to save to localStorage manually (avoids effect_orphan error)
  private save() {
    if (browser) {
      localStorage.setItem('nexora_cart', JSON.stringify(this.items));
    }
  }

  /**
   * Adds an item to the cart or increments its quantity.
   */
  add(id: string, quantity: number = 1) {
    if (quantity <= 0) return;
    this.items = {
      ...this.items,
      [id]: (this.items[id] ?? 0) + quantity
    };
    this.save();
  }

  /**
   * Removes an item from the cart completely.
   */
  remove(id: string) {
    const newItems = { ...this.items };
    delete newItems[id];
    this.items = newItems;
    this.save();
  }

  /**
   * Updates the quantity of a specific item. 
   * If quantity is 0 or less, it removes the item.
   */
  updateQuantity(id: string, quantity: number) {
    if (quantity <= 0) {
      this.remove(id);
    } else {
      this.items = {
        ...this.items,
        [id]: quantity
      };
      this.save();
    }
  }

  /**
   * Gets the current quantity of a specific item.
   */
  getItem(id: string): number {
    return this.items[id] ?? 0;
  }

  /**
   * Empties the entire cart.
   */
  clear() {
    this.items = {};
    this.save();
  }
}

// Export a singleton instance to be used across the app
export const cart = new CartStore();