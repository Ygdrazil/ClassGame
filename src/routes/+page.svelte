<script lang="ts">
	import { goto } from '$app/navigation';
	import { redirect } from '@sveltejs/kit';
	import { empty } from 'svelte/internal';

	let signup_tab = false;

	function changeTab() {
		signup_tab = !signup_tab;
	}
</script>

<div class="flex items-center flex-col relative h-full mt-5">
	<h1 class="text-3xl font-bold">ClassGame</h1>
	<h4 class="text-center">Bienvenue dans le meilleur jeu qui vous aide à étudier !</h4>
	<div class="tabs mt-5">
		<button class="tab tab-lifted" class:tab-active={!signup_tab} on:click={changeTab}
			>Connexion</button
		>
		<button class="tab tab-lifted" class:tab-active={signup_tab} on:click={changeTab}
			>Inscription</button
		>
	</div>
	<div class="card bg-base-200 shadow-xl">
		{#if !signup_tab}
			<div class="card-body">
				<form class="form-control" method="POST" action="?/login">
					<label class="label" for="username">
						<span class="label-text">Nom d'utilisateur</span>
					</label>
					<input class="input" name="username" type="text" />
					<label class="label" for="password">
						<span class="label-text">Mot de passe</span>
					</label>
					<input class="input" name="password" type="password" />
					<input class="btn mt-5" type="submit" value="Se connecter" />
				</form>
			</div>
		{:else}
			<div class="card-body">
				<form class="form-control" method="POST" action="?/register">
					<label class="label" for="username">
						<span class="label-text">Nom d'utilisateur</span>
					</label>
					<input class="input" name="username" type="text" />
					<label class="label" for="password">
						<span class="label-text">Mot de passe</span>
					</label>
					<input class="input" name="password" type="password" />
					<label class="label" for="password">
						<span class="label-text">Confirmer le mot de passe</span>
					</label>
					<input class="input" name="password" type="password" />
					<input class="btn mt-5" type="submit" value="S'inscrire" />
				</form>
			</div>
		{/if}
	</div>
</div>
