<script lang="js">
	import { marked } from 'marked';

    export let content;
    export let title;
    export let title_image;

    console.log(content);
    console.log(title);
    console.log(title_image);
</script>

<div class=" mx-5 my-5">
        <div class="relative overflow-hidden rounded-3xl mb-20">
            <img class="object-cover w-screen object-bottom" src="{title_image}" alt="title_image"/>
            <div class="absolute bottom-0 bg-slate-100 bg-opacity-40 w-full">
                <h1 class="text-5xl font-bold text-center mt-3 mb-3">
                    {title}
                </h1>
            </div>
        </div>
        
        <div>
            <article class="prose ">
                {@html marked(content)}
            </article>
        </div>
    </div>



