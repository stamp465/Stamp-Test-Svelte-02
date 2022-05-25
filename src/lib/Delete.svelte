<script lang="js">
	import Cookies from 'js-cookie';
	import { clientWithAuthToken } from '../client';
	import { setClient, mutation } from '@urql/svelte';
	import { page } from '$app/stores';
	import { goto } from '$app/navigation';

	let userSession = Cookies.get('MY_BLOG_APP_TOKEN');
	if (userSession) {
		setClient(clientWithAuthToken(userSession));
		const { secret } = JSON.parse(userSession);
		setClient(clientWithAuthToken(secret));
	}

	const deletePost = mutation({
		query: `
        mutation DeletePost($id: ID!) {
          deletePost(id: $id) {
            _id
            title
          }
        }
      `
	});

	async function handleDelete() {
		let confirmAction = confirm('Are you sure to execute this action?');
		if (confirmAction) {
			const { data, error } = await deletePost({ id: $page.params.id });

      if (error) {
        console.log('error', error);
        alert('error', error.message);
        return;
      }

      if (data.deletePost) {
        alert('Post deleted');
        goto('/Edit_Delete');
      }
		} else {
			
		}

	}
</script>

<button on:click|preventDefault={handleDelete} disabled={!userSession} class="btn modal-button"
	>Delete</button
>
