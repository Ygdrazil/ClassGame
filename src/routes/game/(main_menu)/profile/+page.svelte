<script lang="ts">
	import { goto } from '$app/navigation';
	import type { PageData } from './$types';

	export let data: PageData;

	function searchNewUsers() {
		goto('/game/profile/addFollow');
	}

	async function disconnect() {
		await fetch('/api/user/disconnect');
		goto('/');
	}
</script>

<h1 class="mb-2">Profil</h1>

<h2 class="mb-10">{data.username}</h2>

<h3 class="mb-2 self-start text-start">Cartes :</h3>

<div class="grid grid-cols-2 gap-2 text-center">
	{#each data.cards as card}
		<div class="bg-base-300 rounded-md p-3">
			<h4 class="card-title">{card.name}</h4>
			<div class="card-text">
				<p>{card.desc}</p>
			</div>
		</div>
	{/each}
</div>

<div class="mt-5 flex flex-row justify-between w-full">
	<h3>Utilisateurs suivis :</h3>
	<button class="btn" on:click={searchNewUsers}
		><svg class="w-6 h-6" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"
			><path
				fill-rule="evenodd"
				d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z"
				clip-rule="evenodd"
			/></svg
		></button
	>
</div>
<div class=" flex flex-row gap-x-5 overflow-x-auto">
	{#each data.followed_users as followed_user}
		<button class="card bg-base-300" on:click={() => goto('/game/profile/'+ followed_user.username)}>
			<div class="card-body">
				{followed_user.username}
			</div>
		</button>
	{/each}
</div>

<button class="btn btn-error mt-3" on:click={disconnect}>Déconnexion</button>
