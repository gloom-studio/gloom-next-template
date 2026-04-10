'use client';

import { SignOutButton } from '@/components/auth/sign-out-button';
import { authClient } from '@/lib/auth-client';

export function DashboardContent() {
  const { data: session, isPending } = authClient.useSession();
  const user = session?.user;

  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center px-6">
      <div className="flex max-w-2xl flex-col items-center gap-3 text-center text-sm">
        <pre className="mb-1 rounded-md border bg-card p-1 text-xs text-card-foreground">
          components/dashboard/dashboard-content.tsx
        </pre>

        <div>
          User from session:
          {isPending ? (
            <span className="mt-0.5 block font-mono text-xs">Loading session...</span>
          ) : user ? (
            <span className="mt-0.5 block font-mono text-xs">
              {user.name ?? 'No name'} ({user.email}) - {user.id}
            </span>
          ) : (
            <span className="mt-0.5 block font-mono text-xs text-red-500">No active session</span>
          )}
        </div>

        <div>
          <p>
            The <code>/dashboard</code> page is protected by Next.js proxy middleware:
          </p>
          <pre className="mx-auto mt-0.5 block w-fit rounded-md border bg-card p-1 text-xs text-card-foreground">
            proxy.ts
          </pre>
        </div>

        <SignOutButton />
      </div>
    </div>
  );
}
