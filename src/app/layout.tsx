import { Analytics } from '@vercel/analytics/react';
import type { Metadata } from 'next';
import { Oswald } from 'next/font/google';
import Script from 'next/script';

import './globals.css';
import { Toaster } from '@/components/ui/toaster';
import HomePageLayout from '@/layout/home-page-layout';
import ErrorBoundary from '@/components/ErrorBoundary';

const oswald = Oswald({
  subsets: ['latin'],
  weight: ['400'], // 400 is the weight for Regular
});

export const metadata: Metadata = {
  title: 'FIT SIXES 2K24',
  description: 'FIT SIXES 2K24',
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
      <body className={oswald.className}>
        <ErrorBoundary>
          <HomePageLayout>
            {children}
            <Analytics />
          </HomePageLayout>
          <Toaster />
        </ErrorBoundary>
      </body>
    </html>
  );
}
