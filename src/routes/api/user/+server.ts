import { error, json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { prisma } from '$lib/utils/prisma';

export const GET = (async ({ url }) => {
	const searchParam = url.searchParams.get("search");

	let queryParams = { 
		select: {
			username: true,
			id:true
		},
		where: {}
	};

	if (searchParam) {
		queryParams.where = { username: { contains: searchParam } };
	}

	const users = await prisma.user.findMany(queryParams);

	return json(users);
}) as RequestHandler;
