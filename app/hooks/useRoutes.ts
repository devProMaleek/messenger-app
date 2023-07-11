import { usePathname } from 'next/navigation';
import { useMemo } from 'react';
import { HiChat } from 'react-icons/hi';
import { IoMdSettings } from 'react-icons/io';
import { HiArrowLeftOnRectangle, HiUsers } from 'react-icons/hi2';
import { signOut } from 'next-auth/react';
import useConversation from './useConversation';

const useRoutes = () => {
  const pathname = usePathname();

  const { conversationId } = useConversation();

  const routes = useMemo(
    () => [
      {
        label: 'Chat',
        icon: HiChat,
        href: '/conversations',
        isActive: pathname === '/conversations' || !!conversationId,
      },
      {
        label: 'Users',
        icon: HiUsers,
        href: '/users',
        isActive: pathname === '/users',
      },
      {
        label: 'Settings',
        icon: IoMdSettings,
        href: '/settings',
        isActive: pathname === '/settings',
      },
      {
        label: 'Logout',
        href: '#',
        icon: HiArrowLeftOnRectangle,
        onClick: () => signOut(),
      },
    ],
    [pathname, conversationId]
  );

  return routes;
};

export default useRoutes;
