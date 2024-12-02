<script lang="ts">
  import type { FilterStore } from '../../stores/filterStore';

  export let store: FilterStore;

  const sortOptions = [
    { value: '', label: 'Featured' },
    { value: 'price-asc', label: 'Price: Low to High' },
    { value: 'price-desc', label: 'Price: High to Low' },
    { value: 'name-asc', label: 'Name: A to Z' },
    { value: 'name-desc', label: 'Name: Z to A' }
  ];

  function handleSortChange(value: string) {
    store.updateSort(value);
  }
</script>

<div>
  <label class="block text-sm font-medium text-gray-700 mb-2">Sort By</label>
  
  <select
    value={$store.sort}
    on:change={(e) => handleSortChange(e.currentTarget.value)}
    class="w-full border rounded-md p-2"
  >
    {#each sortOptions as option}
      <option value={option.value}>{option.label}</option>
    {/each}
  </select>
</div>