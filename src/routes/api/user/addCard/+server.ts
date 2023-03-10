import { error, json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { prisma } from '$lib/utils/prisma';

export const PATCH = (async ({ request }) => {
    // add card to user
    const { username, card_id } = await request.json();

    if(!username || !card_id) {
        throw error(403, { message: "Wrong body" });
    }

    const user = await prisma.user.update({
        where: {
            username: username,
        },
        data: {
            cards: {
                connect: {
                    id: card_id,
                }
            }
        }
    });


    if(!user) {
        throw error(403, { message: "User not found" });
    }

    return json({status: 200, message: "Card added to user" });
} ) as RequestHandler;