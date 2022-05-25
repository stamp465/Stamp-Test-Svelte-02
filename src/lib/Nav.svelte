<script lang="js">
	import { userSession } from '../store.js';
	import Cookies from 'js-cookie';
	let user;
	userSession.subscribe((val) => {
		user = val;
	});
	console.log('Is user = ');
	console.log(user);

	function logout() {
		userSession.update(() => null);
		Cookies.remove('MY_BLOG_APP_TOKEN');
	}
</script>

<div class="navbar bg-neutral text-neutral-content mb-20">
	<div class="navbar-start">
		<div class="dropdown">
			<!-- svelte-ignore a11y-label-has-associated-control -->
			<label tabindex="0" class="btn btn-ghost lg:hidden ">
				<svg
					xmlns="http://www.w3.org/2000/svg"
					class="h-5 w-5"
					fill="none"
					viewBox="0 0 24 24"
					stroke="currentColor"
					><path
						stroke-linecap="round"
						stroke-linejoin="round"
						stroke-width="2"
						d="M4 6h16M4 12h8m-8 6h16"
					/></svg
				>
			</label>
			<ul
				tabindex="0"
				class="menu menu-compact dropdown-content mt-3 p-2 shadow bg-neutral rounded-box w-52 "
			>
				{#if user}
					<li><a href="/posts/new">New Post</a></li>
					<li><a href="/Edit_Delete">Edit Post</a></li>
				{:else}
					<li><a href="/register">register</a></li>
				{/if}
			</ul>
		</div>
		<a href="/" class="btn btn-ghost normal-case text-xl">Blog</a>
	</div>
	<div class="navbar-end">
		<div class="hidden lg:flex ">
			<ul class="menu menu-horizontal p-0">
				{#if user}
					<li><a href="/posts/new">New Post</a></li>
					<li><a href="/Edit_Delete">Edit Post</a></li>
				{:else}
					<li><a href="/register">register</a></li>
				{/if}
			</ul>
		</div>
		{#if user}
			<a href="/" on:click={logout} class="btn">Logout</a>
			
		{:else}
			<a href="/login" class="btn" >Login</a>
		{/if}
	</div>
</div>
