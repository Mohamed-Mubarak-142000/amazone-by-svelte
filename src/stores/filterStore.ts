import { writable } from 'svelte/store';

interface FilterState {
  priceRange: {
    min: number;
    max: number;
  };
  category: string;
  brand: string;
  search: string;
  sort: string;
}

const initialState: FilterState = {
  priceRange: {
    min: 0,
    max: 5000
  },
  category: '',
  brand: '',
  search: '',
  sort: ''
};

export interface FilterStore {
  subscribe: any;
  updatePriceRange: (range: { min: number; max: number }) => void;
  updateCategory: (category: string) => void;
  updateBrand: (brand: string) => void;
  updateSearch: (search: string) => void;
  updateSort: (sort: string) => void;
  reset: () => void;
}

export function createFilterStore(): FilterStore {
  const { subscribe, set, update } = writable<FilterState>(initialState);

  return {
    subscribe,
    updatePriceRange: (range) => update(state => ({ ...state, priceRange: range })),
    updateCategory: (category) => update(state => ({ ...state, category })),
    updateBrand: (brand) => update(state => ({ ...state, brand })),
    updateSearch: (search) => update(state => ({ ...state, search })),
    updateSort: (sort) => update(state => ({ ...state, sort })),
    reset: () => set(initialState)
  };
}