import type { Metadata } from 'next';

import { Toaster } from '@/components/ui/toaster';
import HomePageLayout from '@/layout/home-page-layout';
import { Inter } from 'next/font/google';

const inter = Inter({ 
  subsets: ['latin'],
  weight: ['400'], // 400 is the weight for Regular
});

export const metadata: Metadata = {
  title: 'Dashboard',
  description: 'Dashboard',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <body className={inter.className} >
        <HomePageLayout>
        {children}
      </HomePageLayout>
      </body>
  );
}
