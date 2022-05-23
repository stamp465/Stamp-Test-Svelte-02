<script>
	export let _id = '';
	export let title = '';
	export let author_username = '';
    export let description = '';
	export let title_image = '';
</script>

<div class="card shadow-xl">
	<figure><img src="{title_image}" alt="title_image"  class="object-cover h-48 w-96"/></figure>
	<div class="card-body">
		<h2 class="card-title">{title}</h2>
		<p>{description.slice(0, 80)}...</p>
        <p>Post by {author_username}</p>
		<div class="justify-end">
			<a href="/posts/{_id}" class="btn btn-primary ">Read</a>
		</div>
	</div>
  </div>
