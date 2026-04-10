export default function DashboardPage() {
  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center px-6">
      <div className="flex max-w-2xl flex-col items-center gap-3 text-center text-sm">
        <pre className="mb-1 rounded-md border bg-card p-1 text-xs text-card-foreground">
          app/dashboard/page.tsx
        </pre>

        <div>
          User from session cookie:
          <span className="mt-0.5 block font-mono text-xs">
            Authenticated user (resolved in auth flow)
          </span>
        </div>

        <div>
          <p>
            The <code>/dashboard</code> page is protected by Next.js proxy middleware:
          </p>
          <pre className="mx-auto mt-0.5 block w-fit rounded-md border bg-card p-1 text-xs text-card-foreground">
            proxy.ts
          </pre>
        </div>
      </div>
    </div>
  );
}
