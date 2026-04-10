'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';

import { authClient } from '@/lib/auth-client';

export function SignOutButton() {
  const router = useRouter();
  const [isSigningOut, setIsSigningOut] = useState(false);

  async function handleSignOut() {
    setIsSigningOut(true);
    await authClient.signOut();
    router.push('/login');
    router.refresh();
    setIsSigningOut(false);
  }

  return (
    <button
      type="button"
      onClick={() => void handleSignOut()}
      disabled={isSigningOut}
      className="rounded-md border px-3 py-2 text-xs font-medium transition hover:bg-accent disabled:opacity-60"
    >
      {isSigningOut ? 'Signing out...' : 'Sign out'}
    </button>
  );
}
