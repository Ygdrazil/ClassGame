import { error, json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { PrismaClient } from '@prisma/client';

export const GET = (async ({ cookies }) => {
	// deleting cookie by setting a past date
	//cookies.set('jwt', '', { expires: new Date(), path: '/' });
	cookies.delete('jwt', { path: '/' });
	return json({status: 200});
}) as RequestHandler;
