'use client';

import { ArrowLeftIcon } from 'lucide-react';
import { useRouter } from 'next/navigation';

import { Button } from '@/components';

export default function BackToHomeButton() {
  const router = useRouter();

  return <Button variant="outline" className="text-white border-white hover:bg-white hover:text-darkBlue bg-darkBlue" onClick={() => router.push('/')}> <ArrowLeftIcon className="w-4 h-4 mr-2" />
   <span className='hidden md:block'>Back to Home</span>
  </Button>;
}
