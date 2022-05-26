<script lang="js">
	import { operationStore, query, setClient } from '@urql/svelte';
	import { page } from '$app/stores';
	import client from '../../client';
	import Edit_T2 from '$lib/Edit_T2.svelte';
	import Preview from '$lib/Preview.svelte';
	setClient(client);

	const currentPost = operationStore(
		`
      query GetPostById($id: ID!) {
        findPostByID(id: $id) {
          _id
          title
		  title_image
          content
          author {
            username
          }
        }
      }
    `,
		{ id: $page.params.id },
		{ requestPolicy: 'network-only' }
	);

	query(currentPost);

	export let post = null;
	export let content='';
    export let title='';
    export let title_image='';
	let preview=false;

	currentPost.subscribe(({ data }) => {
		if (data) {
			post = data.findPostByID;
			title = post.title;
			title_image = post.title_image;
			content = post.content;
			console.log(post.title)
		}
	});


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

	<Edit_T2
		bind:post
		bind:content
		bind:title
		bind:title_image
	/>
{/if}


<footer class="bg-neutral bg-opacity-20 text-white text-center fixed inset-x-0 bottom-0 p-3">
	<button class='btn btn-success w-1/2' on:click={showPreview}> 
		{#if preview}
			Back to Post Page
		{:else}
			Preview Page
		{/if}
	</button>
</footer>
