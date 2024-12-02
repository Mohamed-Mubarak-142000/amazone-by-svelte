import { writable } from 'svelte/store';

interface User {
  id: string;
  email: string;
  name: string;
}

function createAuthStore() {
  const { subscribe, set, update } = writable<User | null>(null);

  return {
    subscribe,
    login: (user: User) => set(user),
    logout: () => set(null),
    updateProfile: (updates: Partial<User>) => 
      update(user => user ? { ...user, ...updates } : null)
  };
}

export const auth = createAuthStore();