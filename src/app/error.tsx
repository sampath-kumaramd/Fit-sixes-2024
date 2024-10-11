'use client' // Error components must be Client Components
 
import { useEffect } from 'react'

import { Logo } from '@/components'
 
export default function Error500({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error)
  }, [error])
 
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-darkBlue">
      <Logo logoSize="large" />
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