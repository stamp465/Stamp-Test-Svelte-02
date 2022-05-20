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
		  content
          author {
            email
          }
        }
      }
    }
  `,
		{ size: 100 },
		{ requestPolicy: 'network-only' }
	);

	query(allPosts);

	import Cookies from 'js-cookie';
	console.log(Cookies);
</script>



{#if $allPosts.fetching}
	<progress class="progress w-56" />
{:else if $allPosts.error}
	<p>Oh no... {$allPosts.error.message}</p>
{:else}
	{#each $allPosts.data.listPosts.data as post}
		<div class="post-wrap">
			<!--<a href="/posts/{post._id}">
				<div>{post.title}</div>
			</a>
			<span>by {post.author.email}</span>-->
			<Card _id={post._id} title={post.title}  author_email={post.author.email} description={post.content}/>
		</div>
		
	{/each}
{/if}



<style>
	.post-wrap {
		margin-bottom: 1rem;
	}
</style>


