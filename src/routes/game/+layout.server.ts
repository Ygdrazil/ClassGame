import { redirect } from '@sveltejs/kit';
import jwt, { type JwtPayload } from 'jsonwebtoken';
import type { LayoutServerLoad } from './$types';

export const load = (async ({ cookies }) => {
	const jwt_token = cookies.get('jwt');
	if (!jwt_token) {
		throw redirect(302, '/');
	}

	const decoded = await jwt.verify(jwt_token, import.meta.env.VITE_JWT_SECRET!!) as JwtPayload;
    
	// redirect to '/' if token is invalid
	if (!decoded) {
		throw redirect(302, '/');
	}

	return decoded.data ;
}) as LayoutServerLoad;
