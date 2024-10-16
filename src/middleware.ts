import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export async function middleware(request: NextRequest) {
  const accessToken = request.cookies.get('accessToken')?.value;

  if (!accessToken && request.nextUrl.pathname.startsWith('/auth/onboarding')) {
    return NextResponse.redirect(new URL('/auth/sign-in', request.url));
  }

  // Proceed with the request
  const response = await NextResponse.next();

  // Check if the response status is 401 (Unauthorized)
  if (response.status === 401) {
    // Clear the accessToken and refreshToken cookies
    response.cookies.delete('accessToken');
    response.cookies.delete('refreshToken');

    // Redirect to the sign-in page
    return NextResponse.redirect(new URL('/auth/sign-in', request.url));
  }

  return response;
}

export const config = {
  matcher: ['/auth/onboarding/:path*', '/api/:path*'],
};
