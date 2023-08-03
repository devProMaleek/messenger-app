import { Metadata } from 'next';
import Sidebar from '../components/Sidebar/Sidebar';
import ConversationList from './components/ConversationList';
import getConversation from '../actions/getConversation';

export const metadata: Metadata = {
  title: 'Messenger App - Conversation Page',
  description: 'SEO Title',
};
export default async function UsersLayout({ children }: { children: React.ReactNode }) {
  const conversations = await getConversation();
  return (
    <Sidebar>
      <ConversationList initialItems={conversations} />
      <div className="h-full">{children}</div>
    </Sidebar>
  );
}
