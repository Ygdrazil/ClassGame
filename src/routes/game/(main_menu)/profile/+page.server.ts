import { error } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import { PrismaClient } from '@prisma/client';

export const load = (async ({ parent }) => {
	const { username } = await parent();

	if (!username) {
		return error(403, { message: 'You are not logged in' });
	}

	const prisma = new PrismaClient();

	// get user cards
	const user = await prisma.user.findUnique({
		
		include: {
			cards: true,
			following: {
				select: {
					id: true,
					username: true
				}
			},
		},
		where: {
			username: username
		}
	});

	await prisma.$disconnect();

	if (!user) {
		return error(403, { message: 'You are not logged in' });
	}


	// return user cards
	return { followed_users: user.following, cards: user.cards };
}) as PageServerLoad;
