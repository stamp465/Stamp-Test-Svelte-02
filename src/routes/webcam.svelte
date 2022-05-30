<script>
    import { onMount } from 'svelte';


	let videoSource = null;
	let loading = false;
	onMount(async () => {
		try {
			loading = true;
			const stream = await navigator.mediaDevices.getUserMedia({
				video: true
			});
			videoSource.srcObject = stream;
			videoSource.play();
			loading = false;
		} catch (error) {
			console.log(error);
		}
	});
</script>

<div>
	
    <div class="grid grid-cols-1 place-items-center mx-5 my-5">
        {#if loading}
            <h1>loading...</h1>
        {/if}
        <video bind:this={videoSource} />
    </div>
	
</div>
