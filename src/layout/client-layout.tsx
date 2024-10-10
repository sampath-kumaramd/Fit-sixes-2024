'use client';

import { useEffect, useState } from 'react';

import { usePathname } from 'next/navigation';

import Header from './components/header';


export default function ClientLayout({
  children,
  isAuthPage: initialIsAuthPage,
}: {
  children: React.ReactNode;
  isAuthPage: boolean;
}) {
  const pathname = usePathname();
  const [isAuthPage, setIsAuthPage] = useState(initialIsAuthPage);

  useEffect(() => {
    setIsAuthPage(pathname?.startsWith('/auth') || false);
  }, [pathname]);

  return (
    <>
      {!isAuthPage && <Header />}
      {children}
    </>
  );
}