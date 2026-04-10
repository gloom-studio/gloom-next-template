'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

import { Input } from '@/components/ui/input';
import { PasswordInput } from '@/components/ui/password-input';
import { authClient } from '@/lib/auth-client';

function getField(formData: FormData, field: string) {
  const value = formData.get(field);
  return typeof value === 'string' ? value : '';
}

export default function LoginPage() {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function onSubmit(event: React.SubmitEvent<HTMLFormElement>) {
    event.preventDefault();
    setError(null);
    setLoading(true);

    const formData = new FormData(event.currentTarget);
    const email = getField(formData, 'email');
    const password = getField(formData, 'password');

    const { error: signInError } = await authClient.signIn.email({
      email,
      password,
    });

    setLoading(false);

    if (signInError) {
      setError(signInError.message ?? 'Invalid email or password.');
      return;
    }

    router.push('/dashboard');
    router.refresh();
  }

  return (
    <main className="mx-auto flex min-h-screen w-full max-w-md items-center px-6 py-12">
      <form onSubmit={onSubmit} className="w-full space-y-4">
        <h1 className="text-2xl font-semibold">Login</h1>

        <Input
          required
          type="email"
          name="email"
          placeholder="Email"
          autoComplete="email"
          className="w-full rounded-md border px-3 py-2"
        />
        <PasswordInput
          required
          name="password"
          placeholder="Password"
          autoComplete="current-password"
          className="w-full rounded-md border px-3 py-2"
        />

        {error ? <p className="text-sm text-red-500">{error}</p> : null}

        <button
          type="submit"
          disabled={loading}
          className="w-full rounded-md bg-foreground px-3 py-2 text-background disabled:opacity-60"
        >
          {loading ? 'Logging in...' : 'Login'}
        </button>

        <p className="text-sm text-muted-foreground">
          No account?{' '}
          <Link href="/register" className="underline">
            Register
          </Link>
        </p>
      </form>
    </main>
  );
}
