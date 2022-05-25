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
	<h3>Register New User</h3>
	<form on:submit|preventDefault={onSubmit}>
		<div>
			<label for="name">Email</label>
			<input type="text" id="email" name="email" value="" />
		</div>
		<div>
			<label for="name">Username</label>
			<input type="text" id="username" name="username" value="" />
		</div>
		<div>
			<label for="name">Password</label>
			<input type="password" id="password" name="password" value="" />
		</div>
		<div>
			<label for="name">About me</label>
			<input type="text" id="about_me" name="about_me" value="" />
		</div>
		<button class="button is-light" type="submit">Register</button>
	</form>
</div>
