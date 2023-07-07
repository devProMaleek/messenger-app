import './globals.css';
import { Inter } from 'next/font/google';
import ToasterContext from '@/app/context/ToasterContext';
import AuthContext from './context/AuthContext';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'Messenger App',
  description: 'This is an app created by Abdulmalik Adebayo (devProMaleek)',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AuthContext>
          <ToasterContext />
          {children}
        </AuthContext>
      </body>
    </html>
  );
}
