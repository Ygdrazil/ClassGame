<script lang="ts">
	import type { PageData } from './$types';

	export let data: PageData;

</script>

<h2 class="mb-10">{data.user_profile.username}</h2>

<h3 class="mb-2 self-start text-start">Cartes :</h3>

<div class="grid grid-cols-2 gap-2 text-center">
	{#each data.user_profile.cards as card}
		<div class="bg-base-300 rounded-md p-3">
			<h4 class="card-title">{card.name}</h4>
			<div class="card-text">
				<p>{card.desc}</p>
			</div>
		</div>
	{/each}
</div>