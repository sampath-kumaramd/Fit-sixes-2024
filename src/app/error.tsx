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
    <div className="flex flex-col items-center justify-center min-h-screen bg-darkBlue space-y-4">
      <Logo logoSize="large" />
          <h2>Something went wrong!</h2>
          <p>Oops! An error occurred while processing your request.</p>
      <button
        onClick={
          // Attempt to recover by trying to re-render the segment
          () => reset()
        }
      >
        Try again
      </button>
    </div>
  )
}