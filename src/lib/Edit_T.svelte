<script>
	import Cookies from 'js-cookie';
	import { setClient, mutation } from '@urql/svelte';
	import { clientWithAuthToken } from '../client';
	import { goto } from '$app/navigation';
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
	let title = '';
	let title_image = '';
	let content = '';
	let errorMessage = '';
	function toggleEdit() {
		isEdit = !isEdit;
		if (isEdit) {
			title = post.title;
			title_image = post.title_image;
			content = post.content;
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


<!-- The button to open modal -->
<label on:click={toggleEdit} for="my-modal-3" class="btn modal-button">Edit Post</label>

<!-- Put this part before </body> tag -->
<input type="checkbox" id="my-modal-3" class="modal-toggle " />
<div class="modal">
  <div class="modal-box max-w-4xl flex flex-col items-center">
    <label for="my-modal-3" class="btn btn-sm btn-circle absolute right-2 top-2">✕</label>


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
		<button type="submit" class="btn btn-active btn-primary">Update</button>
	</form>

  </div>

</div>



<!--
<style>
	.error {
		color: coral;
	}
	.update {
		margin-bottom: 10px;
		margin-top: 10px;
	}
</style>



{#if isEdit}
	<div>
		<h5>Edit Post</h5>
		{#if errorMessage}
			<p class="error">{errorMessage}</p>
		{/if}
		<form on:submit|preventDefault={onSubmit}>
			<div class="input-blocks">
				<label for="name">Title</label>
				<input type="text" name="title" bind:value={title} />
			</div>
			<div class="input-blocks">
				<label for="name">Title Image</label>
				<input type="text" name="title_image" bind:value={title_image} />
			</div>
			<div class="input-blocks">
				<label for="name">Content</label>
				<textarea type="text" name="content" bind:value={content} />
			</div>
			<button class="update" type="submit" disabled={!userSession}>Update</button>
		</form>
	</div>
{/if}

<button on:click={toggleEdit} disabled={!userSession}>Edit</button>-->