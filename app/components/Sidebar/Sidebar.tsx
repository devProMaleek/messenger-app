import React, { ReactNode } from 'react';
import DesktopSidebar from './DesktopSidebar';
import MobileFooter from './MobileFooter';
import getCurrentUser from '@/app/actions/getCurrentUser';

type Props = {
  children: ReactNode;
};

const Sidebar = async ({ children }: Props) => {
  const currentUser = getCurrentUser();
  
  return (
    <>
      <div className="h-full">
        <DesktopSidebar />
        <MobileFooter />
        <main className="h-full lg:pl-20">{children}</main>
      </div>
    </>
  );
};

export default Sidebar;
