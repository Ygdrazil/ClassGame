import { error, json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { prisma } from '$lib/utils/prisma';

export const GET = (async ({ url }) => {
  // get subjects from database and return them
    const subjects = await prisma.subject.findMany();
    return json(subjects);
}) as RequestHandler;