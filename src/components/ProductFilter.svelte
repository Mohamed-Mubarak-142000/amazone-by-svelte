<script lang="ts">
  import { products } from '../stores/productStore';
  import { createFilterStore } from '../stores/filterStore';
  import PriceRangeSlider from './filters/PriceRangeSlider.svelte';
  import CategoryFilter from './filters/CategoryFilter.svelte';
  import BrandFilter from './filters/BrandFilter.svelte';
  import SortFilter from './filters/SortFilter.svelte';

  const filterStore = createFilterStore();
  
  function resetFilters() {
    filterStore.reset();
  }

  $: {
    products.filterProducts({
      minPrice: $filterStore.priceRange.min,
      maxPrice: $filterStore.priceRange.max,
      category: $filterStore.category,
      brand: $filterStore.brand,
      search: $filterStore.search,
      sort: $filterStore.sort
    });
  }
</script>

<div class="bg-white p-4 rounded-lg shadow-md space-y-6">
  <div class="flex justify-between items-center">
    <h2 class="text-xl font-bold">Filters</h2>
    <button
      on:click={resetFilters}
      class="text-sm text-blue-600 hover:text-blue-800"
    >
      Reset All
    </button>
  </div>

  <div class="space-y-6">
    <div class="border-b pb-4">
      <PriceRangeSlider store={filterStore} />
    </div>

    <div class="border-b pb-4">
      <CategoryFilter store={filterStore} />
    </div>

    <div class="border-b pb-4">
      <BrandFilter store={filterStore} />
    </div>

    <div>
      <SortFilter store={filterStore} />
    </div>
  </div>
</div>