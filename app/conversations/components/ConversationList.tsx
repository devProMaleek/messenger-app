'use client'

import useConversation from '@/app/hooks/useConversation';
import { MdOutlineGroupAdd } from 'react-icons/md';
import { Conversation } from '@prisma/client';
import clsx from 'clsx';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import ConversationBox from './ConversationBox';
import { FullConversationType } from '@/app/types';

interface ConversationListProps {
  initialItems: FullConversationType[];
}
export default function ConversationList({ initialItems }: ConversationListProps) {
  const router = useRouter();
  const [items, setItems] = useState(initialItems);

  const { isOpen, conversationId } = useConversation();

  return (
    <>
      <aside
        className={clsx(
          `fixed inset-y-0 pb-20 lg:pb-0 lg:left-20 lg:w-80 lg:block overflow-y-auto border-r border-gray-200`,
          isOpen ? 'hidden' : 'block w-full left-0'
        )}
      >
        <div className="px-5">
          <div className="flex justify-between pt-4 mb-4">
            <div className="text-2xl font-bold text-neutral-800">Messages</div>
            <div className="rounded-full p-2 bg-gray-100 text-gray-600 cursor-pointer transition hover:opacity-75">
              <MdOutlineGroupAdd className='w-5 h-5' />
            </div>
          </div>
          {items.map((item) => (
            <ConversationBox key={item.id} data={item} selected={conversationId === item.id} />
          ))}
        </div>
      </aside>
    </>
  );
}
