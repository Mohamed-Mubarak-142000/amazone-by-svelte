<script lang="ts">
  import { Link } from "svelte-routing";
  import { cart } from "../stores/cartStore";
  import { wishlist } from "../stores/wishlistStore";
  import { products } from "../stores/productStore";
  import { auth } from "../stores/authStore";
  import { onMount } from "svelte";
  
  let searchQuery = "";
  let isSearchFocused = false;
  let showUserMenu = false;
  
  $: cartItemsCount = $cart.reduce((total, item) => total + item.quantity, 0);
  $: wishlistCount = $wishlist.length;
  $: cartTotal = $cart.reduce((total, item) => total + (item.price * item.quantity), 0);

  function handleSearch() {
    products.filterProducts({ search: searchQuery });
  }

  function handleLogout() {
    auth.logout();
    showUserMenu = false;
  }

  onMount(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const searchContainer = document.getElementById('search-container');
      const userMenu = document.getElementById('user-menu');
      
      if (searchContainer && !searchContainer.contains(event.target as Node)) {
        isSearchFocused = false;
      }
      
      if (userMenu && !userMenu.contains(event.target as Node)) {
        showUserMenu = false;
      }
    };

    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  });
</script>

<header class="bg-gray-900 text-white sticky top-0 z-50">
  <div class="container mx-auto px-4">
    <div class="flex items-center justify-between h-16">
      <Link to="/" class="text-2xl font-bold text-yellow-400 hover:text-yellow-300 transition-colors">
        AmazonClone
      </Link>
      
      <div class="flex-1 mx-8 relative" id="search-container">
        <div class="relative">
          <input
            type="text"
            bind:value={searchQuery}
            on:input={handleSearch}
            on:focus={() => isSearchFocused = true}
            placeholder="Search products..."
            class="w-full px-4 py-2 pr-10 rounded-lg text-gray-900 focus:ring-2 focus:ring-yellow-400 focus:outline-none"
          >
          <button 
            class="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
            on:click={handleSearch}
          >
            🔍
          </button>
        </div>
      </div>
      
      <nav class="flex items-center space-x-6">
        <div class="relative" id="user-menu">
          {#if $auth}
            <button
              on:click={() => showUserMenu = !showUserMenu}
              class="hover:text-yellow-400 transition-colors group"
            >
              <div class="text-sm">
                <div class="text-gray-300 group-hover:text-yellow-400">Hello, {$auth.name}</div>
                <div class="font-bold">Account & Lists</div>
              </div>
            </button>
            
            {#if showUserMenu}
              <div class="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 text-gray-800">
                <Link
                  to="/account"
                  class="block px-4 py-2 text-sm hover:bg-gray-100"
                >
                  Your Account
                </Link>
                <Link
                  to="/orders"
                  class="block px-4 py-2 text-sm hover:bg-gray-100"
                >
                  Your Orders
                </Link>
                <button
                  on:click={handleLogout}
                  class="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
                >
                  Sign Out
                </button>
              </div>
            {/if}
          {:else}
            <Link to="/login" class="hover:text-yellow-400 transition-colors group">
              <div class="text-sm">
                <div class="text-gray-300 group-hover:text-yellow-400">Hello, Sign in</div>
                <div class="font-bold">Account & Lists</div>
              </div>
            </Link>
          {/if}
        </div>
        
        <Link to="/wishlist" class="hover:text-yellow-400 transition-colors relative group">
          <span class="absolute -top-2 -right-2 bg-yellow-400 text-gray-900 rounded-full w-5 h-5 flex items-center justify-center text-xs font-bold group-hover:bg-yellow-300">
            {wishlistCount}
          </span>
          <div class="text-sm">
            <div>Wishlist</div>
          </div>
        </Link>
        
        <Link to="/cart" class="hover:text-yellow-400 transition-colors relative group">
          <span class="absolute -top-2 -right-2 bg-yellow-400 text-gray-900 rounded-full w-5 h-5 flex items-center justify-center text-xs font-bold group-hover:bg-yellow-300">
            {cartItemsCount}
          </span>
          <div class="text-sm">
            <div>Cart</div>
            <div class="font-bold">${cartTotal.toFixed(2)}</div>
          </div>
        </Link>
      </nav>
    </div>
  </div>
</header>