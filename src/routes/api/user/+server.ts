import { error, json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { PrismaClient } from '@prisma/client';

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

	const prisma = new PrismaClient();
	const users = await prisma.user.findMany(queryParams);

	await prisma.$disconnect();
	return json(users);
}) as RequestHandler;
