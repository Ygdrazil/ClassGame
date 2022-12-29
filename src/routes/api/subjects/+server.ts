import { error, json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { PrismaClient } from '@prisma/client';

export const GET = (async ({ url }) => {
  // get subjects from database and return them
    const prisma = new PrismaClient();
    const subjects = await prisma.subject.findMany();
    await prisma.$disconnect();
    return json(subjects);
}) as RequestHandler;