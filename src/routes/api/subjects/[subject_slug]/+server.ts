import { error, json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { prisma } from '$lib/utils/prisma';

export const GET = (async ({ params }) => {
	// get subject from subject_slug and return it
	const slug = params.subject_slug;

	const subject = await prisma.subject.findUnique({
		include: {
			cards: true,
		},
		where: {
			slug: slug
		}
	});


    if (!subject) {
        throw error(404, 'Subject not found');
    }
	
	return json(subject);
}) as RequestHandler;
