<script lang="ts">
	import { goto } from '$app/navigation';
	import type { LayoutData } from './$types';
	export let data: LayoutData;

	function chooseSubject(slug: string) {
		return () => {
			goto(`/game/story/${slug}`);
		};
	}
</script>

<div>
	<h1>Matières</h1>

	{#each data.subjects as subject}
		<div class="card bg-base-300 shadow-xl mt-10 mx-3">
			<div class="card-body">
				<h3>{subject.name}</h3>
				<p>{subject.desc}</p>
				<div class="card-actions justify-end">
					<button class="btn btn-primary" on:click={chooseSubject(subject.slug)}>Commencer</button>
				</div>
			</div>
		</div>
	{/each}
</div>
