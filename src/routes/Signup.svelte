<script lang="ts">
  import { auth } from '../stores/authStore';
  import { Link, navigate } from 'svelte-routing';

  let name = '';
  let email = '';
  let password = '';
  let confirmPassword = '';
  let error = '';

  async function handleSignup(e: Event) {
    e.preventDefault();
    error = '';

    if (password !== confirmPassword) {
      error = 'Passwords do not match';
      return;
    }

    try {
      // Simulate signup - Replace with actual API call
      if (name && email && password) {
        auth.login({
          id: '1',
          email,
          name
        });
        navigate('/');
      } else {
        error = 'Please fill in all fields';
      }
    } catch (err) {
      error = 'Error creating account';
    }
  }
</script>

<div class="min-h-screen bg-gray-100 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
  <div class="max-w-md w-full space-y-8 bg-white p-8 rounded-lg shadow-md">
    <div>
      <h2 class="mt-6 text-center text-3xl font-extrabold text-gray-900">
        Create your account
      </h2>
    </div>
    <form class="mt-8 space-y-6" on:submit={handleSignup}>
      {#if error}
        <div class="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
          {error}
        </div>
      {/if}
      
      <div class="rounded-md shadow-sm -space-y-px">
        <div>
          <label for="name" class="sr-only">Full name</label>
          <input
            id="name"
            name="name"
            type="text"
            bind:value={name}
            required
            class="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-yellow-500 focus:border-yellow-500 focus:z-10 sm:text-sm"
            placeholder="Full name"
          >
        </div>
        <div>
          <label for="email" class="sr-only">Email address</label>
          <input
            id="email"
            name="email"
            type="email"
            bind:value={email}
            required
            class="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-yellow-500 focus:border-yellow-500 focus:z-10 sm:text-sm"
            placeholder="Email address"
          >
        </div>
        <div>
          <label for="password" class="sr-only">Password</label>
          <input
            id="password"
            name="password"
            type="password"
            bind:value={password}
            required
            class="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-yellow-500 focus:border-yellow-500 focus:z-10 sm:text-sm"
            placeholder="Password"
          >
        </div>
        <div>
          <label for="confirm-password" class="sr-only">Confirm password</label>
          <input
            id="confirm-password"
            name="confirm-password"
            type="password"
            bind:value={confirmPassword}
            required
            class="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-yellow-500 focus:border-yellow-500 focus:z-10 sm:text-sm"
            placeholder="Confirm password"
          >
        </div>
      </div>

      <div>
        <button
          type="submit"
          class="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-gray-900 bg-yellow-400 hover:bg-yellow-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500"
        >
          Create Account
        </button>
      </div>
    </form>

    <div class="text-center">
      <p class="text-sm text-gray-600">
        Already have an account?
        <Link to="/login" class="font-medium text-yellow-600 hover:text-yellow-500">
          Sign in
        </Link>
      </p>
    </div>
  </div>
</div>