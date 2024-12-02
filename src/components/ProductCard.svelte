<script lang="ts">
  import type { Product } from '../types';
  import { cart } from '../stores/cartStore';
  import { wishlist } from '../stores/wishlistStore';
  import { Link } from 'svelte-routing';

  export let product: Product;

  $: isInWishlist = $wishlist.some(item => item.id === product.id);

  function addToCart() {
    cart.addToCart(product);
  }

  function toggleWishlist() {
    if (isInWishlist) {
      wishlist.removeFromWishlist(product.id);
    } else {
      wishlist.addToWishlist(product);
    }
  }
</script>

<div class="bg-white rounded-lg shadow-md overflow-hidden transition-transform duration-300 hover:-translate-y-1">
  <Link to={`/product/${product.id}`}>
    <div class="relative pb-[100%]">
      <img 
        src={product.image} 
        alt={product.title} 
        class="absolute top-0 left-0 w-full h-full object-cover"
      >
    </div>
  </Link>

  <div class="p-4">
    <Link to={`/product/${product.id}`}>
      <h3 class="text-lg font-semibold line-clamp-2 hover:text-blue-600 mb-1">{product.title}</h3>
    </Link>
    
    <div class="flex items-center mb-2">
      <span class="text-yellow-400">★★★★</span>
      <span class="text-yellow-400">★</span>
      <span class="text-xs text-gray-500 ml-1">(4.2)</span>
    </div>

    <p class="text-gray-600 text-sm mb-2">{product.brand}</p>
    
    <div class="flex items-baseline mb-4">
      <span class="text-xl font-bold">${product.price.toFixed(2)}</span>
      {#if product.price > 100}
        <span class="text-xs text-gray-500 ml-2">Free Shipping</span>
      {/if}
    </div>

    <div class="flex gap-2">
      <button
        on:click={addToCart}
        class="flex-1 bg-yellow-400 text-gray-900 px-4 py-2 rounded-md font-semibold hover:bg-yellow-500 transition-colors"
      >
        Add to Cart
      </button>
      <button
        on:click={toggleWishlist}
        class="w-12 flex items-center justify-center bg-gray-100 text-gray-800 rounded-md hover:bg-gray-200 transition-colors"
      >
        <span class={isInWishlist ? 'text-red-500' : ''}>
          {isInWishlist ? '♥' : '♡'}
        </span>
      </button>
    </div>
  </div>
</div>