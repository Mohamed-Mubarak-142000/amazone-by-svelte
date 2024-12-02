import { writable } from 'svelte/store';
import type { CartItem, Product } from '../types';

function createCartStore() {
  const { subscribe, set, update } = writable<CartItem[]>([]);

  return {
    subscribe,
    addToCart: (product: Product) => {
      update(items => {
        const existingItem = items.find(item => item.id === product.id);
        if (existingItem) {
          return items.map(item =>
            item.id === product.id
              ? { ...item, quantity: item.quantity + 1 }
              : item
          );
        }
        return [...items, { ...product, quantity: 1 }];
      });
    },
    removeFromCart: (productId: number) => {
      update(items => items.filter(item => item.id !== productId));
    },
    updateQuantity: (productId: number, quantity: number) => {
      update(items =>
        items.map(item =>
          item.id === productId
            ? { ...item, quantity: Math.max(0, quantity) }
            : item
        )
      );
    },
    clearCart: () => set([])
  };
}

export const cart = createCartStore();