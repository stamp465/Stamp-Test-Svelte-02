<script>
	import { setClient, mutation } from '@urql/svelte';
	import client from '../client';
	import Cookies from 'js-cookie';
	import { goto } from '$app/navigation';
	import { userSession } from '../store';

	setClient(client);

	const loginMutation = mutation({
		query: `
        mutation ($email: String!, $password: String!) {
          login(email: $email, password: $password) {
            secret
            ttl
            data {
              _id
              email
            }
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
		const { email, password } = data;
		/*console.log(data);*/
		const resp = await loginMutation({ email, password });
		/*console.log(resp);*/

		if (resp.data == undefined) {
			alert('Worng email or Password');
		} else if (resp.data.login.data) {
			Cookies.set(
				'MY_BLOG_APP_TOKEN',
				JSON.stringify({
					id: resp.data.login.data._id,
					secret: resp.data.login.secret
				}),
				{ expires: resp.data.login.data.ttl }
			);
			userSession.update(() => ({
				
				email,
				id: resp.data.login.data._id,
				secret: resp.data.login.secret
			}));
			alert('Login Successful');
			goto('/');
		}
	}
</script>

<div class="">
	<h1 class="font-bold text-center mb-5 text-3xl">
		Login Form
	</h1>
	<form on:submit|preventDefault={onSubmit} class="bg-blue-100 w-full max-w-3xl bg-white flex flex-col py-5 px-8 rounded-lg shadow-lg">
		<div class="input-blocks mb-5">

			<label for="name" class="font-semibold">Email</label>
			<input type="text" placeholder="Type here" class="input input-bordered w-full h-10" id="email" name="email"/>
		
		</div>
		<div class="input-blocks mb-5">

			<label for="name" class="font-semibold">Password</label>
			<input type="password" placeholder="Type here" class="input input-bordered w-full h-10" id="password" name="password"/>
		

		</div>
		<button type="submit" class="btn btn-active btn-primary">Submit</button>
	</form>
</div>
