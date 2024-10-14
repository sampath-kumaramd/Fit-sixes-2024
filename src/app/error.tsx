'use client' // Error components must be Client Components
 
import { useEffect } from 'react'

import Image from 'next/image';

import { Logo } from '@/components'
 
export default function Error500({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
 
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-darkBlue">
      <Image src="/logo/logo-light.svg" alt="logo" width={150} height={150} />

          <h2 className='text-2xl font-bold text-white mt-8'>Something went wrong!</h2>
          <p className='text-white mt-4'>Oops! An error occurred while processing your request.</p>
      <button
        onClick={
          () => reset()
        }
        className='bg-white text-darkBlue px-4 py-2 rounded-md mt-4'
      >
        Try again
      </button>
    </div>
  )
}