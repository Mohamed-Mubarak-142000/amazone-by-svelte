import { writable } from 'svelte/store';
import type { Product } from '../types';

function createWishlistStore() {
  const { subscribe, update } = writable<Product[]>([]);

  return {
    subscribe,
    addToWishlist: (product: Product) => {
      update(items => {
        if (!items.find(item => item.id === product.id)) {
          return [...items, product];
        }
        return items;
      });
    },
    removeFromWishlist: (productId: number) => {
      update(items => items.filter(item => item.id !== productId));
    }
  };
}

export const wishlist = createWishlistStore();