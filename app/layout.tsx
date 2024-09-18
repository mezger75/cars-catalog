import type { Metadata } from 'next';
import localFont from 'next/font/local';
import { Toaster } from 'react-hot-toast';

import Header from '@/app/components/header';
import './globals.css';
import { AuthProvider } from '@/app/utils/auth-context';

const geistSans = localFont({
  src: './fonts/GeistVF.woff',
  variable: '--font-geist-sans',
  weight: '100 900',
});
const geistMono = localFont({
  src: './fonts/GeistMonoVF.woff',
  variable: '--font-geist-mono',
  weight: '100 900',
});

export const metadata: Metadata = {
  title: 'Cars catalog',
  description: 'Created by Ivan K',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen bg-gray-50 flex flex-col`}
      >
        <AuthProvider>
          <Header />
          <main className="flex-grow p-4 flex flex-col container mx-auto">
            {children}
          </main>
          <Toaster position="bottom-right" />
        </AuthProvider>
      </body>
    </html>
  );
}
