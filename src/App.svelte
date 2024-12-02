<script lang="ts">
  import { Router, Link, Route } from "svelte-routing";
  import Header from "./components/Header.svelte";
  import CategoryNav from "./components/CategoryNav.svelte";
  import Home from "./routes/Home.svelte";
  import ProductDetails from "./routes/ProductDetails.svelte";
  import Cart from "./routes/Cart.svelte";
  import Wishlist from "./routes/Wishlist.svelte";
  import Login from "./routes/Login.svelte";
  import Signup from "./routes/Signup.svelte";
  
  export let url = "";
</script>

<Router {url}>
  <Header />
  <CategoryNav />

  <main class="min-h-screen bg-gray-100">
    <Route path="/" component={Home} />
    <Route path="/product/:id" let:params>
      <ProductDetails id={parseInt(params.id)} />
    </Route>
    <Route path="/cart" component={Cart} />
    <Route path="/wishlist" component={Wishlist} />
    <Route path="/login" component={Login} />
    <Route path="/signup" component={Signup} />
  </main>

  <footer class="bg-gray-900 text-white py-8">
    <div class="container mx-auto px-4">
      <div class="grid grid-cols-4 gap-8">
        <div>
          <h3 class="font-bold mb-4">Get to Know Us</h3>
          <ul class="space-y-2">
            <li><a href="#" class="hover:text-yellow-400">About Us</a></li>
            <li><a href="#" class="hover:text-yellow-400">Careers</a></li>
            <li><a href="#" class="hover:text-yellow-400">Press Releases</a></li>
          </ul>
        </div>
        <div>
          <h3 class="font-bold mb-4">Make Money with Us</h3>
          <ul class="space-y-2">
            <li><a href="#" class="hover:text-yellow-400">Sell products</a></li>
            <li><a href="#" class="hover:text-yellow-400">Become an Affiliate</a></li>
            <li><a href="#" class="hover:text-yellow-400">Advertise Your Products</a></li>
          </ul>
        </div>
        <div>
          <h3 class="font-bold mb-4">Payment Products</h3>
          <ul class="space-y-2">
            <li><a href="#" class="hover:text-yellow-400">Business Card</a></li>
            <li><a href="#" class="hover:text-yellow-400">Shop with Points</a></li>
            <li><a href="#" class="hover:text-yellow-400">Reload Your Balance</a></li>
          </ul>
        </div>
        <div>
          <h3 class="font-bold mb-4">Let Us Help You</h3>
          <ul class="space-y-2">
            <li><a href="#" class="hover:text-yellow-400">Your Account</a></li>
            <li><a href="#" class="hover:text-yellow-400">Your Orders</a></li>
            <li><a href="#" class="hover:text-yellow-400">Help Center</a></li>
          </ul>
        </div>
      </div>
    </div>
  </footer>
</Router>