<script lang="js">
	import { operationStore, query, setClient } from '@urql/svelte';
	import { page } from '$app/stores';
	import { marked } from 'marked';
	import client from '../../client';
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
</script>

{#if $currentPost.fetching}
	<progress class="progress" />
{:else}
	<div class="relative overflow-hidden rounded-bl-3xl rounded-br-3xl mb-20">
		<img class="object-cover w-screen object-bottom" src="{$currentPost.data.findPostByID.title_image}" alt="title_image"/>
		<div class="absolute bottom-0 bg-slate-100 bg-opacity-40 w-full">
			<h1 class="text-5xl font-bold text-center mt-3 mb-3">
				{$currentPost.data.findPostByID.title}
			</h1>
		</div>
	</div>
	
	<div>
		<article class="prose ">
			{@html marked($currentPost.data.findPostByID.content)}
		</article>
	</div>

	
{/if}
