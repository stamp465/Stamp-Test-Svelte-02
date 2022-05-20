<script>
	export let _id = '';
	export let title = '';
	export let author_email = '';
    export let description = '';
</script>

<div class="card shadow-xl">
	<div class="card-body">
		<h2 class="card-title">{title}</h2>
		<p>{description.slice(0, 80)}...</p>
        <p>Post by {author_email}</p>
		<div class="justify-end">
			<a href="/posts/{_id}" class="btn btn-primary ">Read</a>
		</div>
	</div>
</div>
