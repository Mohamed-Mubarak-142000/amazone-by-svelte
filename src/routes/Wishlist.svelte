<script lang="ts">
  import { wishlist } from '../stores/wishlistStore';
  import { cart } from '../stores/cartStore';
  import ProductCard from '../components/ProductCard.svelte';
</script>

<div class="container mx-auto px-4 py-8">
  <h2 class="text-2xl font-bold mb-6">Your Wishlist ({$wishlist.length} items)</h2>
  
  {#if $wishlist.length === 0}
    <div class="bg-white rounded-lg shadow-md p-6">
      <p>Your wishlist is empty</p>
    </div>
  {:else}
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {#each $wishlist as product (product.id)}
        <div class="relative">
          <ProductCard {product} />
          <button
            class="absolute top-2 right-2 bg-red-500 text-white p-2 rounded-full hover:bg-red-600"
            on:click={() => wishlist.removeFromWishlist(product.id)}
          >
            ×
          </button>
        </div>
      {/each}
    </div>
  {/if}
</div>