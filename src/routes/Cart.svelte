<script lang="ts">
  import { cart } from '../stores/cartStore';

  function updateQuantity(productId: number, newQuantity: number) {
    if (newQuantity === 0) {
      cart.removeFromCart(productId);
    } else {
      cart.updateQuantity(productId, newQuantity);
    }
  }

  $: subtotal = $cart.reduce((total, item) => total + (item.price * item.quantity), 0);
  $: itemCount = $cart.reduce((total, item) => total + item.quantity, 0);
</script>

<div class="container mx-auto px-4 py-8">
  <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
    <div class="lg:col-span-2">
      <div class="bg-white rounded-lg shadow-md p-6">
        <h2 class="text-2xl font-bold mb-6">Shopping Cart ({itemCount} items)</h2>
        
        {#if $cart.length === 0}
          <p>Your cart is empty</p>
        {:else}
          {#each $cart as item}
            <div class="flex items-center gap-4 py-4 border-b">
              <img src={item.image} alt={item.title} class="w-24 h-24 object-cover rounded-md">
              <div class="flex-1">
                <h3 class="font-semibold">{item.title}</h3>
                <p class="text-gray-600">${item.price}</p>
                <div class="flex items-center gap-2 mt-2">
                  <button
                    class="px-2 py-1 border rounded"
                    on:click={() => updateQuantity(item.id, item.quantity - 1)}
                  >-</button>
                  <span>{item.quantity}</span>
                  <button
                    class="px-2 py-1 border rounded"
                    on:click={() => updateQuantity(item.id, item.quantity + 1)}
                  >+</button>
                  <button
                    class="ml-4 text-red-600"
                    on:click={() => cart.removeFromCart(item.id)}
                  >Remove</button>
                </div>
              </div>
              <div class="font-bold">
                ${(item.price * item.quantity).toFixed(2)}
              </div>
            </div>
          {/each}
        {/if}
      </div>
    </div>
    
    <div class="lg:col-span-1">
      <div class="bg-white rounded-lg shadow-md p-6">
        <h3 class="text-xl font-bold mb-4">Order Summary</h3>
        <div class="space-y-2">
          <div class="flex justify-between">
            <span>Subtotal:</span>
            <span>${subtotal.toFixed(2)}</span>
          </div>
          <div class="flex justify-between">
            <span>Shipping:</span>
            <span>FREE</span>
          </div>
          <div class="flex justify-between font-bold text-lg pt-2 border-t">
            <span>Total:</span>
            <span>${subtotal.toFixed(2)}</span>
          </div>
        </div>
        <button
          class="w-full mt-6 bg-yellow-400 text-gray-900 py-2 rounded-md font-semibold hover:bg-yellow-500"
        >
          Proceed to Checkout
        </button>
      </div>
    </div>
  </div>
</div>