<script lang="js">
	import { gql, operationStore, query, setClient } from '@urql/svelte';
	import client from '../client';
	setClient(client);

	import { userSession } from '../store.js';

	let user;
	userSession.subscribe((val) => {
		user = val;
	});
	console.log('user = ');
	console.log(user.id);
	console.log(user.email);

	const myPosts = operationStore(
		gql`
			query GetAllPosts($size: Int!, $cursor: String, $email: String!) {
				GetPostByUsersEmail(_size: $size, _cursor: $cursor, email: $email) {
					data {
						email
						username
						posts {
							data {
								_id
								title
								author {
									email
								}
							}
						}
					}
				}
			}
		`,
		{ size: 100, email: user.email },
		{ requestPolicy: 'network-only' }
	);

	query(myPosts);
</script>

<h1>Posts</h1>

{#if $myPosts.fetching}
	<p>Loading...</p>
{:else if $myPosts.error}
	<p>Oh no... {$myPosts.error.message}</p>
{:else}
	{#each $myPosts.data.GetPostByUsersEmail.data as userpost}
		{#each userpost.posts.data as post}
			<div class="post-wrap">
				<a href="/manage/{post._id}">
					<div>{post.title}</div>
				</a>
				<span>by {post.author.email}</span>
			</div>
		{/each}
	{/each}
{/if}

<style>
	.post-wrap {
		margin-bottom: 1rem;
	}
</style>
