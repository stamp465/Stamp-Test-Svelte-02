<script lang="js">
	import { setClient, mutation } from '@urql/svelte';
	import client from '../client';
	import { goto } from '$app/navigation';

	setClient(client);

	const registerMutation = mutation({
		query: `
        mutation ($email: String!, $password: String!, $username: String!, $about_me: String!) {
          register(email: $email, password: $password, username: $username, about_me: $about_me) {
            email
            _id
          }
        }
      `
	});

	async function onSubmit(e) {
		const formData = new FormData(e.target);

		const data = {};
		for (let field of formData) {
			const [key, value] = field;
			data[key] = value;
		}
		const { email, password, username, about_me } = data;
		const resp = await registerMutation({ email, password, username, about_me });
		if (resp.data.register) {
			goto('/');
		}
		if (resp.error) {
			alert(resp.error.message);
			console.log(resp.error);
		}
	}
</script>

<div class="wrap mt-20">
	<h1 class="font-bold text-center mb-5 text-3xl">
		Register New User
	</h1>
	<form on:submit|preventDefault={onSubmit} class="bg-blue-100 w-full max-w-3xl bg-white flex flex-col py-5 px-8 rounded-lg shadow-lg">
		<div class="input-blocks mb-5">
			<label for="name" class="font-semibold">Email</label>
			<input type="text" placeholder="Type here" class="input input-bordered w-full h-10" id="email" name="email"/>
		</div>
		<div class="input-blocks mb-5">
			<label for="name" class="font-semibold">Username</label>
			<input type="text" placeholder="Type here" class="input input-bordered w-full h-10" id="username" name="username"/>
		</div>
		<div class="input-blocks mb-5">
			<label for="name" class="font-semibold">Password</label>
			<input type="password" placeholder="Type here" class="input input-bordered w-full h-10" id="password" name="password"/>
		</div>
		<div class="input-blocks mb-5">
			<label for="name" class="font-semibold">About me</label>
			<input type="text" placeholder="Type here" class="input input-bordered w-full h-10" id="about_me" name="about_me"/>
		</div>
		<button type="submit" class="btn btn-active btn-primary">Register</button>
	</form>
</div>
