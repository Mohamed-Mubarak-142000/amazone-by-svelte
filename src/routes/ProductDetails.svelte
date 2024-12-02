<script lang="ts">
  import { products } from '../stores/productStore';
  import { cart } from '../stores/cartStore';
  import { wishlist } from '../stores/wishlistStore';
  import ProductCard from '../components/ProductCard.svelte';
  import { onMount } from 'svelte';
  
  export let id: number;
  
  let product = $products.find(p => p.id === id);
  let relatedProducts = $products.filter(p => 
    p.category === product?.category && p.id !== product?.id
  ).slice(0, 4);

  let selectedImage = product?.image;
  let quantity = 1;
  let activeTab = 'description';

  const reviews = [
    { id: 1, user: "John D.", rating: 5, comment: "Great product, exactly as described!", date: "2024-02-15" },
    { id: 2, user: "Sarah M.", rating: 4, comment: "Good quality but shipping took longer than expected.", date: "2024-02-14" },
    { id: 3, user: "Mike R.", rating: 5, comment: "Excellent value for money!", date: "2024-02-13" }
  ];

  function addToCart() {
    if (product) {
      for (let i = 0; i < quantity; i++) {
        cart.addToCart(product);
      }
    }
  }

  function addToWishlist() {
    if (product) {
      wishlist.addToWishlist(product);
    }
  }

  $: isInWishlist = product ? $wishlist.some(item => item.id === product.id) : false;
</script>

{#if product}
  <div class="container mx-auto px-4 py-8">
    <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
      <div class="space-y-4">
        <div class="aspect-w-1 aspect-h-1">
          <img 
            src={selectedImage} 
            alt={product.title}
            class="w-full h-full object-cover rounded-lg shadow-lg"
          >
        </div>
        
        <div class="grid grid-cols-4 gap-2">
          <button
            class="border-2 rounded-lg overflow-hidden {selectedImage === product.image ? 'border-yellow-400' : 'border-transparent'}"
            on:click={() => selectedImage = product.image}
          >
            <img src={product.image} alt="Product thumbnail" class="w-full h-full object-cover">
          </button>
          <!-- Additional product images would go here -->
        </div>
      </div>
      
      <div class="space-y-6">
        <div>
          <h1 class="text-3xl font-bold mb-2">{product.title}</h1>
          <p class="text-gray-600 mb-4">by {product.brand}</p>
          
          <div class="flex items-center mb-4">
            <div class="flex text-yellow-400">★★★★<span class="text-gray-300">★</span></div>
            <span class="text-sm text-gray-600 ml-2">4.2 out of 5</span>
            <span class="text-sm text-blue-600 ml-2 cursor-pointer">({reviews.length} reviews)</span>
          </div>
        </div>

        <div class="border-t border-b py-4">
          <div class="text-3xl font-bold mb-2">${product.price}</div>
          {#if product.price > 100}
            <div class="text-green-600">Free Shipping</div>
          {/if}
        </div>

        <div class="space-y-4">
          <div class="flex items-center space-x-4">
            <label for="quantity" class="text-gray-700">Quantity:</label>
            <select
              id="quantity"
              bind:value={quantity}
              class="border rounded-md px-2 py-1"
            >
              {#each Array(10) as _, i}
                <option value={i + 1}>{i + 1}</option>
              {/each}
            </select>
          </div>

          <div class="flex gap-4">
            <button
              on:click={addToCart}
              class="flex-1 bg-yellow-400 text-gray-900 px-6 py-3 rounded-md font-semibold hover:bg-yellow-500 transition-colors"
            >
              Add to Cart
            </button>
            <button
              on:click={addToWishlist}
              class="px-6 py-3 rounded-md font-semibold border-2 border-gray-300 hover:border-gray-400 transition-colors"
            >
              {isInWishlist ? '♥ In Wishlist' : '♡ Add to Wishlist'}
            </button>
          </div>
        </div>

        <div class="border-t pt-6">
          <div class="flex space-x-4 border-b">
            <button
              class="px-4 py-2 font-medium {activeTab === 'description' ? 'text-yellow-600 border-b-2 border-yellow-400' : 'text-gray-600'}"
              on:click={() => activeTab = 'description'}
            >
              Description
            </button>
            <button
              class="px-4 py-2 font-medium {activeTab === 'specifications' ? 'text-yellow-600 border-b-2 border-yellow-400' : 'text-gray-600'}"
              on:click={() => activeTab = 'specifications'}
            >
              Specifications
            </button>
            <button
              class="px-4 py-2 font-medium {activeTab === 'reviews' ? 'text-yellow-600 border-b-2 border-yellow-400' : 'text-gray-600'}"
              on:click={() => activeTab = 'reviews'}
            >
              Reviews
            </button>
          </div>

          <div class="py-4">
            {#if activeTab === 'description'}
              <p class="text-gray-600">{product.description}</p>
            {:else if activeTab === 'specifications'}
              <div class="space-y-2">
                <div class="grid grid-cols-2 gap-4">
                  <div class="text-gray-600">Brand</div>
                  <div>{product.brand}</div>
                </div>
                <div class="grid grid-cols-2 gap-4">
                  <div class="text-gray-600">Category</div>
                  <div>{product.category}</div>
                </div>
                <!-- Add more specifications as needed -->
              </div>
            {:else if activeTab === 'reviews'}
              <div class="space-y-4">
                {#each reviews as review}
                  <div class="border-b pb-4">
                    <div class="flex items-center justify-between mb-2">
                      <div class="flex items-center">
                        <div class="font-medium">{review.user}</div>
                        <div class="text-yellow-400 ml-2">{'★'.repeat(review.rating)}</div>
                      </div>
                      <div class="text-sm text-gray-500">{review.date}</div>
                    </div>
                    <p class="text-gray-600">{review.comment}</p>
                  </div>
                {/each}
              </div>
            {/if}
          </div>
        </div>
      </div>
    </div>

    <div class="mt-16">
      <h2 class="text-2xl font-bold mb-6">Related Products</h2>
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {#each relatedProducts as relatedProduct (relatedProduct.id)}
          <ProductCard product={relatedProduct} />
        {/each}
      </div>
    </div>
  </div>
{:else}
  <div class="container mx-auto px-4 py-8">
    <p>Product not found</p>
  </div>
{/if}