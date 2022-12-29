import { error, json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { prisma } from '$lib/utils/prisma';

// add new user to follow
export const PATCH = (async ({ request }) => {
    
    const { username, follow_id } = await request.json();

	console.log(username, follow_id);

    if(!username || !follow_id) {
        throw error(403, { message: "Wrong body" });
    }

    const user = await prisma.user.update({
        where: {
            username: username,
        },
        data: {
            following: {
                connect: {
                    id: follow_id,
                }
            }
        }
    });

    if(!user) {
        throw error(403, { message: "User not found" });
    }

    return json({status: 200, message: "New user followed" });
} ) as RequestHandler;