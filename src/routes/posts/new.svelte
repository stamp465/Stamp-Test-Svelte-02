<script lang="js">
	import Cookies from 'js-cookie';
	import { setClient, mutation } from '@urql/svelte';
	import { clientWithAuthToken } from '../../client';
	import { goto } from '$app/navigation';
	import Preview from '$lib/Preview.svelte';
	import { marked } from 'marked';
	

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

	let content='';
    let title='';
    let title_image='';
	let preview=false;

	function showPreview() {
		preview = !preview;
		console.log(content)
		console.log(title)
		console.log(title_image)
	}

</script>

{#if preview}
	<Preview 
		bind:content
		bind:title
		bind:title_image
	/>
{:else}
	<div class="flex flex-col items-center mt-20 mx-5 my-5 ">
		<h1 class="font-bold text-center mb-5 text-3xl">
			New Post
		</h1>
		{#if !userSession}
			<p class="login-promt font-bold text-center mb-5 text-3xl">You must be logged in to create a post</p>
		{/if}
		<form on:submit|preventDefault={onSubmit} class="bg-blue-100 w-full max-w-3xl bg-white flex flex-col py-5 px-8 rounded-lg shadow-lg"> 
			<div class="input-blocks mb-5">
				<label for="name" class="font-semibold">Title</label>
				<input type="text" placeholder="Type here" class="input input-bordered w-full h-10" name="title" bind:value={title}/>
			</div>
			<div class="input-blocks mb-5">
				<label for="name" class="font-semibold">Title Image</label>
				<input type="text" placeholder="Type here" class="input input-bordered w-full h-10" name="title_image" bind:value={title_image} />
			</div>
			<div class="input-blocks mb-5">
				<label for="name" class="font-semibold">Content</label>
				<textarea type="text" class="textarea textarea-bordered h-96 w-full" name="content" bind:value={content} />
			</div>
			{#if userSession}
				<button type="submit" class="btn btn-active modal-button">Submit</button>
			{/if}
			
		</form>
	</div>
{/if}

{#if userSession}
	<footer class="bg-neutral bg-opacity-20 text-white text-center fixed inset-x-0 bottom-0 p-3">
		<button class='btn btn-success w-1/2' on:click={showPreview}> 
			{#if preview}
				Back to Post Page
			{:else}
				Preview Page
			{/if}
		</button>
	</footer>
{/if}



<style>
	.login-promt {
		color: coral;
	}
</style>
