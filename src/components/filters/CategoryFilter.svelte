<script lang="ts">
  import type { FilterStore } from '../../stores/filterStore';
  import { products } from '../../stores/productStore';

  export let store: FilterStore;

  // Get unique categories from products
  $: categories = [...new Set($products.map(p => p.category))].sort();

  function handleCategoryChange(category: string) {
    store.updateCategory(category);
  }
</script>

<div>
  <label class="block text-sm font-medium text-gray-700 mb-2">Category</label>
  
  <div class="space-y-2">
    <label class="flex items-center">
      <input
        type="radio"
        name="category"
        value=""
        checked={$store.category === ''}
        on:change={() => handleCategoryChange('')}
        class="text-yellow-400 focus:ring-yellow-400"
      >
      <span class="ml-2">All Categories</span>
    </label>

    {#each categories as category}
      <label class="flex items-center">
        <input
          type="radio"
          name="category"
          value={category}
          checked={$store.category === category}
          on:change={() => handleCategoryChange(category)}
          class="text-yellow-400 focus:ring-yellow-400"
        >
        <span class="ml-2">{category}</span>
      </label>
    {/each}
  </div>
</div>