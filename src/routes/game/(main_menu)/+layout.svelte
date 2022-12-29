<script lang="ts">
	import { goto } from '$app/navigation';

	let current_page = 'home';

	function move_to(page: string) {
		return () => {
			current_page = page;
			goto(`/game/${page}`);
		};
	}
</script>

<div class="w-full">
	<div class="flex flex-col items-center mx-2 pb-20">
		<slot />
	</div>

	<div class="btm-nav bg-base-200">
		<button
			class="text-secondary"
			class:active={current_page === 'home'}
			on:click={move_to('home')}
		>
			<svg
				class="w-6 h-6"
				fill="currentColor"
				viewBox="0 0 20 20"
				xmlns="http://www.w3.org/2000/svg"
				><path
					d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z"
				/></svg
			>
		</button>
		<button
			class="text-secondary"
			class:active={current_page === 'subjects'}
			on:click={move_to('subjects')}
		>
			<svg
				class="w-6 h-6"
				fill="currentColor"
				viewBox="0 0 20 20"
				xmlns="http://www.w3.org/2000/svg"
				><path
					d="M7 3a1 1 0 000 2h6a1 1 0 100-2H7zM4 7a1 1 0 011-1h10a1 1 0 110 2H5a1 1 0 01-1-1zM2 11a2 2 0 012-2h12a2 2 0 012 2v4a2 2 0 01-2 2H4a2 2 0 01-2-2v-4z"
				/></svg
			>
		</button>
		<button
			class="text-secondary"
			class:active={current_page === 'profile'}
			on:click={move_to('profile')}
		>
			<svg
				class="w-6 h-6"
				fill="currentColor"
				viewBox="0 0 20 20"
				xmlns="http://www.w3.org/2000/svg"
				><path
					fill-rule="evenodd"
					d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
					clip-rule="evenodd"
				/></svg
			>
		</button>
	</div>
</div>
