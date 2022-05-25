<script>
	import Nav from '$lib/Nav.svelte';
	import Footer from '$lib/Footer.svelte';
	/*import Nav from '$lib/Navtest.svelte';*/
	import '../app.css';
</script>

<Nav />

<main class="container max-w-3xl mb-20 mx-auto my-auto">
  <slot />
</main>

