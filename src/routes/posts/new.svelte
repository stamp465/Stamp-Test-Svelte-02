<script lang="js">
	import Cookies from 'js-cookie';
	import { setClient, mutation } from '@urql/svelte';
	import { clientWithAuthToken } from '../../client';
	import { goto } from '$app/navigation';
	

	let userSession = Cookies.get('MY_BLOG_APP_TOKEN');
	let authorId;

	if (userSession) {
		const { secret, id } = JSON.parse(userSession);
		authorId = id;
		setClient(clientWithAuthToken(secret));
	}

	const newPost = mutation({
		query: `
      mutation CreatePost($title: String!, $title_image: String!, $content: String! $authorId: ID!) {
        createPost(data: {
          title: $title
		  title_image: $title_image
          content: $content
          author: {
            connect: $authorId
          }
        }) {
          _id
          title
		  title_image
          content
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
		console.log(data);
		const { title, title_image, content } = data;
		try {
			console.log('authorId', authorId);
			if (!authorId) {
				alert('You must be logged in to create a post');
				return;
			}
			const resp = await newPost({ title, title_image, content, authorId });
			if (resp.data.createPost) {
				alert('Post created successfully');
				goto('/');
			}
		} catch (error) {
			console.log(error);
		}
	}
</script>

<div class="flex flex-col items-center mt-20 ">
	<h1 class="font-bold text-center mb-5 text-3xl">
		New Post
	</h1>
	{#if !userSession}
		<p class="login-promt">You must be logged in to create a post</p>
	{/if}
	<form on:submit|preventDefault={onSubmit} class="bg-blue-100 w-full max-w-3xl bg-white flex flex-col py-5 px-8 rounded-lg shadow-lg"> 
		<div class="input-blocks mb-5">
			<label for="name" class="font-semibold">Title</label>
			<input type="text" placeholder="Type here" class="input input-bordered w-full h-10" name="title"/>
		</div>
		<div class="input-blocks mb-5">
			<label for="name" class="font-semibold">Title Image</label>
			<input type="text" placeholder="Type here" class="input input-bordered w-full h-10" name="title_image" value="" />
		</div>
		<div class="input-blocks mb-5">
			<label for="name" class="font-semibold">Content</label>
			<textarea type="text" class="textarea textarea-bordered h-96 w-full" name="content" value="" />
		</div>
		<button type="submit" class="btn btn-active btn-primary">Submit</button>
	</form>
</div>



<style>
	.login-promt {
		color: coral;
	}
</style>
