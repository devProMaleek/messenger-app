import { Metadata } from 'next';
import Sidebar from '../components/Sidebar/Sidebar';

export const metadata: Metadata = {
  title: 'Users',
  description: 'SEO Title',
};
export default async function UsersLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="h-full">
      <Sidebar>{children}</Sidebar>
    </div>
  );
}
