<script lang="ts">
  import { onMount } from 'svelte';
  import type { FilterStore } from '../../stores/filterStore';

  export let store: FilterStore;
  
  let minInput: number;
  let maxInput: number;
  let rangeMin: number;
  let rangeMax: number;

  onMount(() => {
    // Initialize with the store values
    minInput = $store.priceRange.min || 0;
    maxInput = $store.priceRange.max || 5000;
    rangeMin = minInput;
    rangeMax = maxInput;
  });

  function updatePriceRange() {
    store.updatePriceRange({
      min: Math.min(minInput, maxInput),
      max: Math.max(minInput, maxInput)
    });
  }
</script>

<div>
  <label class="block text-sm font-medium text-gray-700 mb-2">Price Range</label>
  
  <div class="flex items-center gap-4 mb-4">
    <div class="flex-1">
      <input
        type="number"
        bind:value={minInput}
        on:change={updatePriceRange}
        min={rangeMin}
        max={rangeMax}
        class="w-full border rounded-md bg-slate-50 p-2"
        placeholder="Min"
      >
    </div>
    <span class="text-gray-500">-</span>
    <div class="flex-1">
      <input
        type="number"
        bind:value={maxInput}
        on:change={updatePriceRange}
        min={rangeMin}
        max={rangeMax}
        class="w-full border bg-slate-50 rounded-md p-2"
        placeholder="Max"
      >
    </div>
  </div>

  <div class="px-2">
    <div class="relative h-2 bg-gray-200 rounded-full">
      <div
        class="absolute h-full bg-yellow-400 rounded-full"
        style="left: {((minInput - rangeMin) / (rangeMax - rangeMin)) * 100}%; right: {100 - ((maxInput - rangeMin) / (rangeMax - rangeMin)) * 100}%"
      ></div>
    </div>
  </div>
</div>