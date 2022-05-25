<script lang="js">
	import { operationStore, query, setClient } from '@urql/svelte';
	import client from '../client';
	import Card from '$lib/Card.svelte';
	setClient(client);

	const allPosts = operationStore(
		`
    query GetAllPosts($size: Int!, $cursor: String) {
      listPosts(_size: $size, _cursor: $cursor) {
        data {
          _id
          title
		  title_image
		  content
          author {
			username
          }
        }
      }
    }
  `,
		{ size: 100 },
		{ requestPolicy: 'network-only' }
	);

	query(allPosts);
	/*console.log(allPosts);*/

	import Cookies from 'js-cookie';
	console.log(Cookies);
</script>

<h1 class="font-bold text-center mb-20 text-5xl mt-20">
	Welcome to Blog
</h1>

{#if $allPosts.fetching}
<div class="grid grid-cols-1 place-items-center mx-5 my-5">
	<progress class="progress w-full self-center" />
</div>
{:else if $allPosts.error}
	<p>Oh no... {$allPosts.error.message}</p>
{:else}
<div class="grid gap-10 px-5 md:grid-cols-2 md:px-10 lg:grid-cols-3 lg:-mx-52 ">
		{#each $allPosts.data.listPosts.data as post}
			<div class="post-wrap">
				<Card
					_id={post._id}
					title={post.title}
					title_image={post.title_image}
					author_username={post.author.username}
					description={post.content}
				/>
			</div>
		{/each}
	</div>
{/if}

<style>
	.post-wrap {
		margin-bottom: 1rem;
	}
</style>
