'use client';

import { User } from '@prisma/client';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { useCallback, useState } from 'react';

import Avatar from '@/app/components/Avatar';

interface UserBoxProps {
  data: User;
}
export default function UserBox({ data }: UserBoxProps) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleClick = useCallback(async () => {
    setIsLoading(true);
    try {
      const response = await axios.post('/api/conversations', {
        userId: data.id,
      });

      if (response) {
        router.push(`/conversations/${response.data.data.id}`);
      }
    } catch (error: any) {
      console.error(error, 'LOAD_CONVERSATION_ERROR');
    } finally {
      setIsLoading(false);
    }
  }, [data, router]);

  return (
    <div
      onClick={handleClick}
      className="w-full relative flex items-center space-x-3 bg-white p-3 hover:bg-neutral-200 rounded-lg transition cursor-pointer"
    >
      <Avatar user={data} active={false} />
      <div className="min-w-0 flex-1">
        <div className="focus:outline-none">
          <div className="flex justify-between items-center mb-1">
            <p className="text-sm font-medium text-gray-900">{data.username || data.name}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
