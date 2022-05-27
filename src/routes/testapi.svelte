<script>
    import { onMount } from "svelte";

    /*let posts = [];*/
    const getApi = async () => {
      const response = await fetch('https://smartcity.nida.ac.th/bap/verifications',{
        method:  'GET',
        headers: {
            'Authorization': 'xxnxx'
        }
      })
      let posts = await response.json();
      console.log(posts)
      return posts
    };

    let getData = getApi();
</script>

{#await getData}
	<b>Loading block</b>
{:then postss}
	<b>{postss.count}</b>
    {#each postss.items as item}
        <p>{item.created_by} {item.created_time} {item.identity.display_name}</p>
    {/each}
{:catch ERROR_VAR}
	<b>Error block</b>
{/await}



