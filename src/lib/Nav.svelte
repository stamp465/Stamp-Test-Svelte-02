<script lang="js">
	import "../app.css";

	import { userSession } from '../store.js';
	import Cookies from 'js-cookie';
	let user;
	userSession.subscribe((val) => {
		user = val;
	});
	console.log("Is user = ")
	console.log(user)

	function logout() {
		userSession.update(() => null);
		Cookies.remove('MY_BLOG_APP_TOKEN');

	}
</script>

<nav>
	<a class="text-3xl font-bold underline" href="/">Home</a>
	{#if user}
		<!-- svelte-ignore a11y-invalid-attribute -->
		<a href="/posts/new">New Post</a>
		<a href="/Edit_Delete">Edit</a>
		<a href="/login" on:click={logout}>Logout</a>
	{:else}
		<a href="/login">Login</a>
		<a href="/register">Register</a>
	{/if}
	<hr />
</nav>
