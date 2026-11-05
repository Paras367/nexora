
class CartStore {
  items = $state<Record<string, number>>({});
  count = $derived(Object.values(this.items).reduce((sum, qty) => sum + qty, 0));

  add(id: string) {
    this.items[id] = (this.items[id] ?? 0) + 1;
  }
}

export const cart = new CartStore();
