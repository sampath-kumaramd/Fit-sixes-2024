import type { Metadata } from 'next';
import { Oswald } from 'next/font/google';
import Script from 'next/script';

import './globals.css';
import { Toaster } from '@/components/ui/toaster';
import HomePageLayout from '@/layout/home-page-layout';

const oswald = Oswald({ 
  subsets: ['latin'],
  weight: ['400'], // 400 is the weight for Regular
});

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
      <link href="https://unpkg.com/@pqina/flip/dist/flip.min.css" rel="stylesheet"></link>
        <Script src="https://unpkg.com/@pqina/flip/dist/flip.min.js"></Script>
      </head>
      <body className={oswald.className}>
        <HomePageLayout>
          {children}
        </HomePageLayout>
        <Toaster />
      </body>
    </html>
  );
}
