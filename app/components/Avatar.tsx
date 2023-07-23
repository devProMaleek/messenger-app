'use client';
import { User } from '@prisma/client';
import Image from 'next/image';
import React from 'react';

type Props = {
  user?: User;
  active?: boolean
};

const Avatar = ({ user, active }: Props) => {
  return (
    <>
      <div className="relative">
        <div className="relative inline-block overflow-hidden rounded-full h-9 w-9 md:h-11 md:w-11 border-[1px] border-gray-400">
          <Image alt="Avatar" src={user?.image || '/images/placeholder.jpg'} fill />
        </div>
        {active && <span className='absolute top-0 right-0 block w-2 h-2 bg-green-500 rounded-full ring-2 ring-white md:w-3 md:h-3' />}
      </div>
    </>
  );
};

export default Avatar;
