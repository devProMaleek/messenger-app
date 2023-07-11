'use client';
import useConversation from '@/app/hooks/useConversation';
import useRoutes from '@/app/hooks/useRoutes';
import React from 'react';
import MobileItem from './MobileItem';

type Props = {};

const MobileFooter = (props: Props) => {
  const routes = useRoutes();
  const { isOpen } = useConversation();

  if (isOpen) {
    return null;
  }
  return (
    <>
      <div className="fixed bottom-0 z-40 flex items-center justify-between w-full bg-white border-t-[1px] lg:hidden">
        {routes.map((route) => (
          <MobileItem
            key={route.label}
            label={route.label}
            href={route.href}
            icon={route.icon}
            isActive={route?.isActive}
            onClick={route?.onClick}
          />
        ))}
      </div>
    </>
  );
};

export default MobileFooter;
