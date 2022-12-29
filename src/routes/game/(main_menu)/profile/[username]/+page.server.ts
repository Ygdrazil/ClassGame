import { error } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import { prisma } from '$lib/utils/prisma';

export const load = (async ({ fetch, params }) => {
	const slug = params.username;

	let json_data: { [x: string]: any } = {};

	const user = prisma.user.findUnique({
		where: {
			username: params.username
		},
		include: {
			cards: true,
			following: {
				select: {
					id: true,
					username: true
				}
			}
		}
	});

	if (!user) {
		throw error(404, '/game/subjects');
	}

	json_data.user_profile = user;

	return json_data;
}) as PageServerLoad;
