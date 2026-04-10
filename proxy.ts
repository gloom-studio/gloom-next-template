import { getSessionCookie } from 'better-auth/cookies';
import { headers } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';

import { auth } from './lib/auth';

export async function proxy(request: NextRequest) {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  const { pathname } = request.nextUrl;

  // Redirect authenticated users away from login/signup pages
  if (session && ['/login', '/register'].includes(pathname)) {
    return NextResponse.redirect(new URL('/dashboard', request.url));
  }

  // Redirect unauthenticated users trying to access protected routes
  if (!session && pathname.startsWith('/dashboard')) {
    return NextResponse.redirect(new URL('/register', request.url));
  }

  return NextResponse.next();
}

export const config = {
  // Apply middleware to these routes
  matcher: ['/dashboard', '/login', '/register'],
};
