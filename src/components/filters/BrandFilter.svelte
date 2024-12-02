<script lang="ts">
  import type { FilterStore } from '../../stores/filterStore';
  import { products } from '../../stores/productStore';

  export let store: FilterStore;

  // Get unique brands from products
  $: brands = [...new Set($products.map(p => p.brand))].sort();

  function handleBrandChange(brand: string) {
    store.updateBrand(brand);
  }
</script>

<div>
  <label class="block text-sm font-medium text-gray-700 mb-2">Brand</label>
  
  <div class="space-y-2 max-h-48 overflow-y-auto">
    <label class="flex items-center">
      <input
        type="radio"
        name="brand"
        value=""
        checked={$store.brand === ''}
        on:change={() => handleBrandChange('')}
        class="text-yellow-400 focus:ring-yellow-400"
      >
      <span class="ml-2">All Brands</span>
    </label>

    {#each brands as brand}
      <label class="flex items-center">
        <input
          type="radio"
          name="brand"
          value={brand}
          checked={$store.brand === brand}
          on:change={() => handleBrandChange(brand)}
          class="text-yellow-400 focus:ring-yellow-400"
        >
        <span class="ml-2">{brand}</span>
      </label>
    {/each}
  </div>
</div>