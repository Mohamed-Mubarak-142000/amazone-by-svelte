<script lang="ts">
  import { products } from '../stores/productStore';

  const categories = [
    { id: "all", name: "All", icon: "🏠" },
    { id: "electronics", name: "Electronics", icon: "📱" },
    { id: "fashion", name: "Fashion", icon: "👕" },
    { id: "gaming", name: "Gaming", icon: "🎮" },
    { id: "books", name: "Books", icon: "📚" },
    { id: "home", name: "Home & Kitchen", icon: "🏠" },
    { id: "beauty", name: "Beauty", icon: "💄" },
    { id: "sports", name: "Sports", icon: "⚽" }
  ];

  let activeCategory = "all";

  function selectCategory(categoryId: string) {
    activeCategory = categoryId;
    products.filterProducts({
      category: categoryId === "all" ? undefined : categoryId
    });
  }
</script>

<nav class="bg-gray-800 text-white sticky top-16 z-40 shadow-md">
  <div class="container mx-auto px-4">
    <ul class="flex items-center space-x-6 py-2 overflow-x-auto scrollbar-hide">
      {#each categories as category}
        <li>
          <button
            class="flex items-center space-x-2 px-3 py-2 rounded-md transition-colors {activeCategory === category.id ? 'bg-yellow-400 text-gray-900' : 'hover:text-yellow-400'}"
            on:click={() => selectCategory(category.id)}
          >
            <span>{category.icon}</span>
            <span class="text-sm whitespace-nowrap">{category.name}</span>
          </button>
        </li>
      {/each}
    </ul>
  </div>
</nav>

<style>
  .scrollbar-hide::-webkit-scrollbar {
    display: none;
  }
  .scrollbar-hide {
    -ms-overflow-style: none;
    scrollbar-width: none;
  }
</style>