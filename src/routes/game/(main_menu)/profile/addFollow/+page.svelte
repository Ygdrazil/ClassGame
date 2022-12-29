<script lang="ts">
	import { goto } from '$app/navigation';
	import type { PageData } from './$types';

	export let data: PageData;

	let search_input = '';
	let found_users: Array<{ username: string; id: number }> = [];

	async function searchUser() {
		if (search_input) {
			const url = '/api/user?search=' + search_input;
			const response = await (await fetch(url)).json();

			found_users = response;
		}
	}

	async function followUser(id: number) {
		
		const response = await fetch('/api/user/followUser', {
			method: 'PATCH',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({ username: data.username, follow_id: id })
		});

		if (response) {
			goto("/game/profile");
		}
	}
</script>

<div class="form-control mt-3">
	<label class="input-group">
		<input
			class="input input-bordered"
			type="text"
			placeholder="Rechercher un utilisateur"
			bind:value={search_input}
		/>
		<button class="btn btn-square" on:click={searchUser}
			><svg
				class="w-6 h-6"
				fill="currentColor"
				viewBox="0 0 20 20"
				xmlns="http://www.w3.org/2000/svg"
				><path
					fill-rule="evenodd"
					d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
					clip-rule="evenodd"
				/></svg
			></button
		>
	</label>
</div>

<div>
	{#each found_users as user}
		<div class="card bg-base-200">
			<div class="card-body">
				<div class="card-title">
					<p>{user.username}</p>
				</div>
				<button class="btn btn-primary" on:click={() => followUser(user.id)}>
					<svg
						class="w-6 h-6"
						fill="currentColor"
						viewBox="0 0 20 20"
						xmlns="http://www.w3.org/2000/svg"
						><path
							d="M8 9a3 3 0 100-6 3 3 0 000 6zM8 11a6 6 0 016 6H2a6 6 0 016-6zM16 7a1 1 0 10-2 0v1h-1a1 1 0 100 2h1v1a1 1 0 102 0v-1h1a1 1 0 100-2h-1V7z"
						/></svg
					>
				</button>
			</div>
		</div>
	{/each}
</div>
