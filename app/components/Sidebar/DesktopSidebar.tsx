'use client';
import React, { useState } from 'react';
import useRoutes from '@/app/hooks/useRoutes';
import DesktopItem from './DesktopItem';

type Props = {};

const DesktopSidebar = (props: Props) => {
  const routes = useRoutes();
  const [isOpen, setIsOpen] = useState<boolean>(false);
  return (
    <>
      <div className="hidden lg:fixed lg:inset-y-0 lg:left-0 lg:z-40 lg:w-20 xl:px-6 lg:overflow-y-auto lg:bg-white lg:border-r-[1px] lg:pb-4 lg:flex lg:flex-col lg:justify-between">
        <nav className="flex flex-col justify-between mt-4">
          <ul role="list" className="flex flex-col items-center space-y-1">
            {routes.map((route) => (
              <DesktopItem
                key={route.label}
                label={route.label}
                href={route.href}
                icon={route.icon}
                isActive={route?.isActive}
                onClick={route?.onClick}
              />
            ))}
          </ul>
        </nav>
      </div>
    </>
  );
};

export default DesktopSidebar;
