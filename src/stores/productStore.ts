import { writable } from 'svelte/store';
import type { Product } from '../types';
import { products as initialProducts } from '../data/products';

function createProductStore() {
  const { subscribe, set } = writable<Product[]>(initialProducts);

  return {
    subscribe,
    filterProducts: (filters: {
      minPrice?: number;
      maxPrice?: number;
      category?: string;
      brand?: string;
      search?: string;
      sort?: string;
    }) => {
      let filteredProducts = [...initialProducts];

      // Apply filters
      if (filters.minPrice !== undefined) {
        filteredProducts = filteredProducts.filter(p => p.price >= filters.minPrice!);
      }
      if (filters.maxPrice !== undefined) {
        filteredProducts = filteredProducts.filter(p => p.price <= filters.maxPrice!);
      }
      if (filters.category) {
        filteredProducts = filteredProducts.filter(p => p.category === filters.category);
      }
      if (filters.brand) {
        filteredProducts = filteredProducts.filter(p => p.brand === filters.brand);
      }
      if (filters.search) {
        const searchLower = filters.search.toLowerCase();
        filteredProducts = filteredProducts.filter(p =>
          p.title.toLowerCase().includes(searchLower) ||
          p.description.toLowerCase().includes(searchLower) ||
          p.brand.toLowerCase().includes(searchLower)
        );
      }

      // Apply sorting
      if (filters.sort) {
        switch (filters.sort) {
          case 'price-asc':
            filteredProducts.sort((a, b) => a.price - b.price);
            break;
          case 'price-desc':
            filteredProducts.sort((a, b) => b.price - a.price);
            break;
          case 'name-asc':
            filteredProducts.sort((a, b) => a.title.localeCompare(b.title));
            break;
          case 'name-desc':
            filteredProducts.sort((a, b) => b.title.localeCompare(a.title));
            break;
        }
      }

      set(filteredProducts);
    }
  };
}

export const products = createProductStore();