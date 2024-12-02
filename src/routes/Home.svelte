<script lang="ts">
  import ProductCard from '../components/ProductCard.svelte';
  import ProductFilter from '../components/ProductFilter.svelte';
  import { products } from '../stores/productStore';
</script>

<div class="container mx-auto px-4 py-8">
  <div class="flex gap-8">
    <div class="w-1/4">
      <ProductFilter />
    </div>
    
    <div class="w-3/4">
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {#each $products as product (product.id)}
          <ProductCard {product} />
        {/each}
      </div>
    </div>
  </div>
</div>