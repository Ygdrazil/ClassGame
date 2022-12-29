import { error } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import { readFile } from "fs/promises";

export const load = (async ({ fetch, params }) => {
	// get subject from subject_slug and return it
	const slug = params.subject_slug;

	let json_data : {[ x: string] : any} = {};

	const res = await fetch(`/api/subjects/${slug}`);
	json_data.subject = await res.json();

	if (!json_data.subject) {
		throw error(404, '/game/subjects');
	}

    // get the corresponding subject_quest json file from the lib/assets folder and return it
    const subject_quest = (await import(`../../../../../lib/assets/subjects/${slug}/subject_quest.json`)).default;

    json_data.quest = subject_quest;

	return json_data;
}) as PageServerLoad;