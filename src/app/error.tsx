'use client'; // Error components must be Client Components

import { useEffect } from 'react';

import { AxiosError } from 'axios';

import { Logo } from '@/components';

export default function Error500({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error);
  }, [error]);

  const isNetworkError =
    error instanceof AxiosError && error.message === 'Network Error';

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-darkBlue space-y-4">
      <Logo logoSize="large" />
      <h2 className="text-2xl font-bold text-white">
        {isNetworkError ? 'Network Error' : 'Something went wrong!'}
      </h2>
      <p className="text-white text-center max-w-md">
        {isNetworkError
          ? "Oops! It seems there's a problem with your internet connection or our server is unreachable."
          : 'Oops! An error occurred while processing your request.'}
      </p>
      {isNetworkError && (
        <p className="text-white text-center max-w-md">
          Please check your internet connection and try again.
        </p>
      )}
      <button
        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
        onClick={() => reset()}
      >
        Try again
      </button>
    </div>
  );
}
