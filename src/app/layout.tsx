import type { Metadata } from 'next';
import { Inter } from 'next/font/google';

import './globals.css';
import { Toaster } from '@/components/ui/toaster';
import HomePageLayout from '@/layout/home-page-layout';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'FIT SIXES 2024',
  description: 'FIT SIXES 2024',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/logo/logo-light.svg" />
      </head>
      <body className={inter.className}>
        <HomePageLayout>
          {children}
        </HomePageLayout>
        <Toaster />
      </body>
    </html>
  );
}
