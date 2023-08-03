import { NextResponse, NextRequest } from 'next/server';
import getCurrentUser from '@/app/actions/getCurrentUser';
import prisma from '@/app/libs/prismadb';

type JSONResponse = {
  status: string;
  message?: string;
  data?: {};
};

export async function POST(request: Request) {
  try {
    const currentUser = await getCurrentUser();
    const { userId, isGroup, members, name } = await request.json();
    let jsonResponse: JSONResponse = {
      status: 'Success',
      data: {},
    };

    if (!currentUser?.id || !currentUser?.email) {
      jsonResponse = {
        status: 'Error',
        message: 'Unauthorized',
      };
      return NextResponse.json(jsonResponse, { status: 401 });
    }

    if (isGroup && (!members || members.length < 2 || !name)) {
      jsonResponse = {
        status: 'Error',
        message: 'Invalid Data',
      };
      return NextResponse.json(jsonResponse, { status: 400 });
    }

    if (isGroup) {
      const newGroupConversation = await prisma.conversation.create({
        data: {
          name,
          isGroup,
          users: {
            connect: [...members.map((member: { value: string }) => ({ id: member.value })), { id: currentUser.id }],
          },
        },
        include: { users: true },
      });
      jsonResponse.data = newGroupConversation;
      return NextResponse.json(jsonResponse, { status: 201, headers: { 'Content-Type': 'application/json' } });
    }

    const existingConversation = await prisma.conversation.findFirst({
      where: {
        AND: [
          { isGroup: false },
          {
            users: {
              every: {
                id: {
                  in: [currentUser.id, userId],
                },
              },
            },
          },
        ],
      },
      include: { users: true },
    });

    // const existingConversations = await prisma.conversation.findMany({
    //   where: {
    //     OR: [
    //       {
    //         userIds: {
    //           equals: [currentUser.id, userId],
    //         },
    //       },
    //       {
    //         userIds: {
    //           equals: [userId, currentUser.id],
    //         },
    //       },
    //     ],
    //   },
    // });

    // const singleConversation = existingConversations[0];

    if (existingConversation) {
      jsonResponse.data = existingConversation;
      return NextResponse.json(jsonResponse, { status: 200, headers: { 'Content-Type': 'application/json' } });
    }

    const newConversation = await prisma.conversation.create({
      data: {
        isGroup: false,
        users: {
          connect: [{ id: currentUser.id }, { id: userId }],
        },
      },
      include: { users: true },
    });

    jsonResponse.data = newConversation;
    return NextResponse.json(jsonResponse, { status: 201, headers: { 'Content-Type': 'application/json' } });
  } catch (error: any) {
    let errorResponse: JSONResponse = {
      status: 'Error',
      message: error.message || 'Internal Server Error',
    };
    return NextResponse.json(errorResponse, { status: 500, headers: { 'Content-Type': 'application/json' } });
  }
}
