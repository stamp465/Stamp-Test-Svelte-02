<script lang="js">
	import { operationStore, query, setClient } from '@urql/svelte';
	import { page } from '$app/stores';
	import client from '../../client';
	setClient(client);

	const currentPost = operationStore(
		`
      query GetPostById($id: ID!) {
        findPostByID(id: $id) {
          _id
          title
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
</script>

{#if $currentPost.fetching}
	<progress class="progress" />
{:else}
	<h2>{$currentPost.data.findPostByID.title}</h2>
	<p>By <b>{currentPost.data.findPostByID.author.username}</b></p>
	<p>{$currentPost.data.findPostByID.content}</p>
{/if}
