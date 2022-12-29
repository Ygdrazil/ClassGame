import type { Actions } from './$types';
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { invalid, redirect } from '@sveltejs/kit';

export const actions: Actions = {
  login: async ({cookies, request}) => {
    const prisma = new PrismaClient();

	// get form data
    const data = await request.formData();
    let username = data.get('username');
    let password = data.get('password');

    // check if username and password are undefined
    if(!username || !password) {
      prisma.$disconnect();
      return invalid(400, { username, password, missing: true });
    }

    // converts username and password to string
    username = String(username);
    password = String(password);

    const user = await prisma.user.findUnique({
      where: {
        username: username,
      }
    });

	await prisma.$disconnect();

	// if no user corresponds, return an invalid object
    if(!user) {
      return invalid(400, { username, missing: true });
    }

	// see if the password matches the hash store in the database
    const match = await bcrypt.compare(password, user.password);

    if(!match) {
      return invalid(403, { password, incorrect: true });
    }

	// create a new Json Web Token and store it in cookie
    let token = await jwt.sign({ data: { username: username } }, import.meta.env.VITE_JWT_SECRET!!, { expiresIn: '1h' });

    cookies.set('jwt', token, { httpOnly: false });

    console.log("User logged in");

    // redirect to home page
    throw redirect(302, '/game/home');
  },
  register: async (event) => {
    const prisma = new PrismaClient();

    const data = await event.request.formData();
    let username = data.get('username');
    let password = data.get('password');

    // check if username and password are not undefined
    if(!username || !password) {
      prisma.$disconnect();
      return invalid(400, { username, password, missing: true });
    }

    // convert username and password to string
    username = String(username);
    password = String(password);

	// try to search if this user already exists
    const user = await prisma.user.findUnique({
      where: {
        username: username,
      }
    });

    if(user) {
      prisma.$disconnect();
      return invalid(400, { username, taken: true });
    }

	// hash the password and create a new user in database
    const hash = await bcrypt.hash(password, 10);

    await prisma.user.create({
      data: {
        username: username,
        password: hash,
      }
    });

    console.log("User created");

    await prisma.$disconnect();

    return { success: true }
  }
};