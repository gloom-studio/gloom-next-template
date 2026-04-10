'use client';

import Link from 'next/link';

import { Button } from '@/components/ui/button';

export function TemplateInfoContent() {
  return (
    <main className="relative min-h-screen w-full overflow-hidden bg-[#3355FF]">
      <div className="pointer-events-none absolute top-8 -left-20 h-72 w-72 rounded-full bg-white/40 blur-[120px]" />
      <div className="pointer-events-none absolute right-0 bottom-0 h-80 w-80 rounded-full bg-white/40 blur-[120px]" />

      <div className="relative mx-auto flex min-h-screen w-full max-w-6xl flex-col items-center justify-center gap-8 px-6 py-8 md:px-10">
        <h1 className="text-4xl font-bold text-white">Gloom Studio Next.JS Starter Template</h1>
        <p className="text-center text-lg text-white">
          Comprises of Next.JS, Better Auth, Prisma, shadcn, Tailwind, Oxlint, Oxfmt, and MCP-first
          workflows. Testing with Playwright and Vitest. Has all the rules and best practices for a
          production-ready application.
        </p>
        <div className="flex gap-4">
          <Link href="/login">
            <Button className="bg-white text-black hover:cursor-pointer hover:bg-white/80 hover:text-black">
              Login
            </Button>
          </Link>
          <Link href="/register">
            <Button className="bg-white text-black hover:cursor-pointer hover:bg-white/80 hover:text-black">
              Register
            </Button>
          </Link>
        </div>
      </div>
    </main>
  );
}
