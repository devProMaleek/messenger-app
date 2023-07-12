import { Metadata } from 'next';
import Sidebar from '../components/Sidebar/Sidebar';

export const metadata = {
  title: 'Users',
  description: 'SEO Title',
};
export default async function UsersLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="h-full">
      {/* @ts-expect-error Server Component */}
      <Sidebar>{children}</Sidebar>
    </div>
  );
}
