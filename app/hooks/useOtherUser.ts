import { useSession } from 'next-auth/react';
import { useMemo } from 'react';
import { Conversation, User } from '@prisma/client';
import { FullConversationType } from '@/app/types';

const useOtherUser = (conversation: FullConversationType | { users: User[] }) => {
  const session = useSession();
  const otherUser = useMemo(() => {
    const currentUserEmail = session?.data?.user?.email;

    return conversation.users.filter((user) => user.email !== currentUserEmail)[0];
  }, [session, conversation]);
  return otherUser;
};

export default useOtherUser;
