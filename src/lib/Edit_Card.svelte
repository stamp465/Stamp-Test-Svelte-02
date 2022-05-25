<script>
	export let _id = '';
	export let title = '';
	export let author_username = '';
    export let description = '';
	export let title_image = '';
</script>

<div class="card shadow-xl ">
	<figure><img src="{title_image}" alt="title_image"  class="object-cover w-screen h-72 "/></figure>
	<div class="flex flex-row card-body bg-white">
		<div class="basis-3/4 ">
			<h2 class="card-title">{title}</h2>
			<h4>{description.slice(0, 10)}...</h4>
		</div>
		
		<div class="basis-1/4 ">
			<a href="/manage/{_id}" class="btn btn-neutral h-full w-full">Edit</a>
		</div>
	</div>
  </div>
