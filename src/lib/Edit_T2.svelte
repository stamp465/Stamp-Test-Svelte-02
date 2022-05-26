<script>
	import Cookies from 'js-cookie';
	import { setClient, mutation } from '@urql/svelte';
	import { clientWithAuthToken } from '../client';
	import { goto } from '$app/navigation';
    import Delete from '$lib/Delete.svelte'
	let userSession = Cookies.get('MY_BLOG_APP_TOKEN');
	if (userSession) {
		const { secret } = JSON.parse(userSession);
		setClient(clientWithAuthToken(secret));
	}
	const updatePost = mutation({
		query: `
        mutation UpdatePost($id: ID!, $title: String!, $title_image: String!, $content: String!) {
          updatePost(id: $id, data: {
            title: $title,
			title_image: $title_image,
            content: $content
          }) {
            _id
          }
        }
      `
	});
	export let post;
	let isEdit = false;
	export let title;
	export let title_image;
	export let content;
	let errorMessage = '';
	function toggleEdit() {
		isEdit = !isEdit;
		if (isEdit) {
			/*title = post.title;
			title_image = post.title_image;
			content = post.content;*/
		}
	}
	async function onSubmit(e) {

		const updatedPost = await updatePost({ id: post._id, title, title_image, content });
		console.log('updatedPost', updatedPost);
		const { data, error } = updatedPost;
		if (error) {
			errorMessage = error.message;
		}
		if (data) {
			alert('Post updated');
			goto(`/Edit_Delete`);
		}
	}
</script>


{#if userSession}

<div class="flex flex-col items-center mt-20 mx-5 my-5 ">
    <h1 class="font-bold text-center mb-5 text-3xl">
        Edit Post
    </h1>

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
			<textarea type="text" class="textarea textarea-bordered h-72 w-full" name="content" bind:value={content} />
		</div>
		<button type="submit" class="btn btn-active btn-primary mb-3">Update</button>
        <Delete />
	</form>

  </div>


{/if}
