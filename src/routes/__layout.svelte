<script>
	import Nav from '$lib/Nav.svelte';
	/*import Nav from '$lib/Navtest.svelte';*/
	import '../app.css';
</script>

<Nav />

<main class="container max-w-3xl mx-auto px-4 ">
  <slot />
</main>

