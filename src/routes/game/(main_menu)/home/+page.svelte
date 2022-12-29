<script lang="ts">
	import type { PageData } from '../../home/$types';

	export let data: PageData;
</script>

<div>
	<h2 class="text-left">Bon retour parmis nous,</h2>
	<h1 class="text-left">{data.username} !</h1>
</div>
