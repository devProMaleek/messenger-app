'use client';

import { User } from '@prisma/client';

interface UserListProps {
  items: User[];
}
export default function UserList({items}: UserListProps) {
  return (
    <>
    <aside className="fixed inset-y-0 left-0 block w-full pb-20 overflow-y-auto border-r border-gray-200 lg:pb-0 lg:left-20 lg:w-20 lg:block">
      <div className="px-5">
        <div className="flex-col">
          <div className="py-4 text-2xl font-bold text-neutral-800">
            Friends
          </div>
        </div>
      </div>
    </aside>
    </>
  );
}
