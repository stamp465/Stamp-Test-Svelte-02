<script>
	import { onMount } from 'svelte';
	//import  * as blazeface from '@tensorflow-models/blazeface';
    import '@tensorflow/tfjs';

	import * as bz from '@tensorflow-models/blazeface';

	let videoSource = null;
	let loading = false;
	let loading2 = false;
	let model;
    
    let canvas = null;


	//console.log(bz);

	const detectFaces = async () => {
		//console.log('test1');
		const prediction = await model.estimateFaces(videoSource, false);
		//console.log('test2');
		//console.log(prediction);

        let ctx = canvas.getContext("2d");
                //console.log("canvas")
                ctx.drawImage(videoSource, 0, 0)
				loading2 = false;
                prediction.forEach((pred) => {
                    ctx.beginPath();
                    ctx.lineWidth = "4";
                    ctx.strokeStyle = "blue";
                    ctx.rect(
                        pred.topLeft[0],
                        pred.topLeft[1],
                        pred.bottomRight[0] - pred.topLeft[0],
                        pred.bottomRight[1] - pred.topLeft[1],
                    );
                    ctx.stroke();
                });

	};

	onMount(async () => {
		try {
			loading = true;
			loading2 = true;
			const stream = await navigator.mediaDevices.getUserMedia({
				video: { width: 600, height: 400}
			});
			videoSource.srcObject = stream;
			videoSource.play();
			loading = false;

			/*model = bz.load();
            console.log("testxx")
            console.log(model)
            console.log("testNNN")
            detectFace();*/

			videoSource.addEventListener('loadeddata', async () => {
				model = await bz.load();
                //console.log("test456")
				setInterval(detectFaces, 100);

                
			});

		} catch (error) {
			console.log(error);
		}
	});
</script>

<div>
	<div class="grid grid-cols-1 place-items-center mx-5 my-5">
		{#if loading}
			<h1>loading camera...</h1>
		{/if}
		<video bind:this={videoSource} />

		{#if loading2}
			<h1>loading face detect...</h1>
		{/if}
		<canvas 
            bind:this={canvas} 
            width=600
            height=400
        />
	</div>
</div>
