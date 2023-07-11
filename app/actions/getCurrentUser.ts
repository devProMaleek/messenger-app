import prisma from '@/app/libs/prismadb';

import getSession from './getSession';

export default async function getCurrentUser() {
  try {
    const session = await getSession();

    if (!session?.user?.email) {
      return null;
    }

    const currentUser = await prisma.user.findFirst({
      where: {
        OR: [{ email: session.user.email }, { username: session.user.email }],
      },
    });

    if (!currentUser) {
      return null;
    }

    return currentUser;
  } catch (error: any) {
    return null
  }
}