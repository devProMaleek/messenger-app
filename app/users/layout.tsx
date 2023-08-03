import { Metadata } from 'next';
import Sidebar from '../components/Sidebar/Sidebar';
import getUsers from '../actions/getUsers';
import UserList from './components/UserList';

export const metadata: Metadata = {
  title: 'Messenger App - Users Page',
  description: 'SEO Title',
};
export default async function UsersLayout({ children }: { children: React.ReactNode }) {
  const users = await getUsers();
  return (
    <Sidebar>
      <div className="h-full">
        <UserList items={users} />
        {children}
      </div>
    </Sidebar>
  );
}
