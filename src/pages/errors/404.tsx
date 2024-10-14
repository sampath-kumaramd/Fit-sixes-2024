import React from 'react';

import Image from 'next/image';
import Link from 'next/link';

import { Logo } from '@/components';


export default function PageNotFound() {
  return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-darkBlue space-y-4">
      <Image src="/logo/logo-light.svg" alt="logo" width={150} height={150} />
      <h1 className="text-6xl font-bold text-white mb-4">404</h1>
      <h2 className="text-2xl font-semibold text-white mb-6">Page Not Found</h2>
      <p className="text-gray-200 mb-8">Oops! The page you&apos;re looking for doesn&apos;t exist.</p>
      <Link href="/">
        <p className="px-4 py-2 text-white font-semibold bg-blue-900 rounded hover:bg-blue-600 transition-colors">
          Go back to homepage
        </p>
      </Link>
    </div>
  );
};
