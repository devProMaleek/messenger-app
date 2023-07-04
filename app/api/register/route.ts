import { NextResponse, NextRequest } from 'next/server';
import bcrypt from 'bcrypt';
import prisma from '@/app/libs/prismadb';

export async function POST(request: Request) {
  // Try and catch the entire logic
  try {
    const { email, name, username, password } = await request.json();

    // Check for valid body data otherwise return error.
    if (!email || !name || !username || !password) {
      return NextResponse.json({ error: 'Invalid body data' }, { status: 400 });
    }

    // Hash the password of the user
    const hashedPassword = await bcrypt.hash(password, 12);

    // Create and store the user details in the database.
    const user = await prisma.user.create({
      data: {
        email,
        name,
        hashedPassword,
        username,
      },
    });

    return NextResponse.json({ data: user, message: 'You have successfully signed up' }, { status: 201 });
  } catch (error: any) {
    // Return the error
    console.log(error, 'REGISTRATION_ERROR');
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
