import React from 'react';

import { Mail } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

import { Logo } from '@/components';


export default function VerifyEmail() {
  return (
      <div className="flex col-span-8  flex-col items-center justify-center  min-h-screen space-y-4">
    <Mail className='w-40 h-40 text-darkBlue' />
      <h1 className="text-6xl font-semibold text-darkBlue mb-4">Verify Email</h1>
      <h2 className="text-2xl text-darkBlue mb-6">You are almost done! Please check your primary email for a verification link.</h2>
      <Link href="/">
        <p className="px-4 py-2 text-white bg-darkBlue rounded hover:bg-blue-900 transition-colors">
          Go back to homepage
        </p>
      </Link>
    </div>
  );
};
