'use client';

import { usePathname } from 'next/navigation';

import Footer from './components/Footer';
import Header from './components/header';

export default function HomePageLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pathname = usePathname();
  const isAuthPage =
    pathname?.startsWith('/auth') && pathname !== '/auth/dashboard';
  return (
    <section className="">
      {!isAuthPage && <Header />}
      {children}
      {!isAuthPage && <Footer />}
    </section>
  );
}
