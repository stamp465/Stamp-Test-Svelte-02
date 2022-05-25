<script lang="js">
	import { operationStore, query, setClient } from '@urql/svelte';
	import { page } from '$app/stores';
	import client from '../../client';
	import Delete from '$lib/Delete.svelte';
	import Edit from '$lib/Edit.svelte';
	import Edit_T from '$lib/Edit_T.svelte';
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

	currentPost.subscribe(({ data }) => {
		if (data) {
			post = data.findPostByID;
			console.log(post)
		}
	});
</script>

{#if $currentPost.fetching}
<div class="grid grid-cols-1 place-items-center mx-5 my-5">
	<progress class="progress w-full self-center" />
</div>
{:else}
<div class="mx-5 my-5">
	<h2 class="mt-20">{$currentPost.data.findPostByID.title}</h2>
	<p>By <b>{currentPost.data.findPostByID.author.username}</b></p>
	<p>{$currentPost.data.findPostByID.content}</p>
	<Edit {post} />
	<Delete />

	<Edit_T {post} />
	<!-- The button to open modal -->
	
</div>
{/if}
