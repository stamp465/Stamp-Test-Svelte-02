<script lang="js">
	import { gql, operationStore, query, setClient } from '@urql/svelte';
	import client from '../client';
	import Card from '$lib/Edit_Card.svelte';
	setClient(client);

	import { userSession } from '../store.js';

	let user;
	userSession.subscribe((val) => {
		user = val;
	});
	/*console.log('user = ');
	console.log(user.id);
	console.log(user.email);*/

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
								title_image
								content
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

<h1 class="font-bold text-center mb-20 text-5xl mt-20">
	My Posts
</h1>

{#if $myPosts.fetching}
	<progress class="progress" />
{:else if $myPosts.error}
	<p>Oh no... {$myPosts.error.message}</p>
{:else}
<div class="grid gap-10 px-5 md:grid-cols-2 md:px-10 lg:grid-cols-3 lg:-mx-52 ">
	{#each $myPosts.data.GetPostByUsersEmail.data as userpost}
		{#each userpost.posts.data as post}
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
	{/each}
</div>
{/if}

<style>
	.post-wrap {
		margin-bottom: 1rem;
	}
</style>
