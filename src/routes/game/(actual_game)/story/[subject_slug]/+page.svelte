<script lang="ts">
	import { goto } from '$app/navigation';
	import type { PageData } from './$types';

	export let data: PageData;

	const quest = data.quest.quest;
	const characters = data.quest.characters;

	let current_dialog = 0;

	let score = 0;

	function change_dialog(next_dialog: number) {
		current_dialog = next_dialog;
	}

	function choose_answer(answer: number) {
		if (quest[current_dialog].type == 'question') {
			if (quest[current_dialog].correct_answer == answer) {
				score++;
			}
		}
		change_dialog(quest[current_dialog].choices[answer].next_dialog);
	}

	async function getCardsRewards() {
		// Find the card that you can win with your current score
		let card_won = undefined;
		for (var i = 0; i < data.subject.cards.length; i++) {
			const current_card = data.subject.cards[i];
			if (current_card.minPoints <= score) {
				card_won = current_card;
			}
		}
		
		if (card_won) {
			console.log('Card won: ' + card_won.name);

			const response = await fetch('/api/user/addCard', {
				method: 'PATCH',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({
					username: data.username,
					card_id: card_won.id
				})
			});

			const result = await response.json();
			if (result.error) {
				alert(result.error);
				goto('/game/home');
			} else {
				alert('Vous avez gagné la carte ' + card_won.name);
				goto('/game/home');
			}
		}
	}
</script>

<h1>{data.subject.name}</h1>
<h2>Votre score : {score}</h2>

{#if quest[current_dialog].type != 'end'}
	<div class="fixed bottom-0 left-0 right-0 min-h-fit">
		<img
			src={'/assets/characters/' + characters[quest[current_dialog].character_id].image}
			alt="Personnage"
		/>
		<div class="pb-5 px-2 bg-base-200">
			<h4 class="mb-5">{characters[quest[current_dialog].character_id].name}</h4>
			<p class="mb-3">
				{quest[current_dialog].text}
			</p>
			{#if quest[current_dialog].type == 'dialog'}
				<button class="btn" on:click={() => change_dialog(quest[current_dialog].next_dialog)}>
					Suivant
				</button>
			{:else if quest[current_dialog].type == 'choice'}
				<div class="flex flex-col items-center gap-y-3">
					{#each quest[current_dialog].choices as choice}
						<button class="btn" on:click={() => change_dialog(choice.next_dialog)}>
							{choice.text}
						</button>
					{/each}
				</div>
			{:else if quest[current_dialog].type == 'question'}
				<div class="flex flex-col items-center gap-y-3">
					{#each quest[current_dialog].choices as choice, index}
						<button class="btn" on:click={() => choose_answer(index)}>
							{choice.text}
						</button>
					{/each}
				</div>
			{/if}
		</div>
	</div>
{:else}
	<h2 class="mt-16 text-center">Vous avez terminé la quête de {data.subject.name} !</h2>

	<button class="btn btn-primary" on:click={getCardsRewards}>Récupérer ses récompenses !</button>
{/if}
