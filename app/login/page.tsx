'use client';

import { useForm } from '@tanstack/react-form';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

import { Input } from '@/components/ui/input';
import { PasswordInput } from '@/components/ui/password-input';
import { authClient } from '@/lib/auth-client';

export default function LoginPage() {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const form = useForm({
    defaultValues: {
      email: '',
      password: '',
    },
    onSubmit: async ({ value }) => {
      setError(null);
      setLoading(true);

      const { error: signInError } = await authClient.signIn.email({
        email: value.email,
        password: value.password,
      });

      setLoading(false);

      if (signInError) {
        setError(signInError.message ?? 'Invalid email or password.');
        return;
      }

      router.push('/dashboard');
      router.refresh();
    },
  });

  return (
    <main className="mx-auto flex min-h-screen w-full max-w-md items-center px-6 py-12">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          void form.handleSubmit();
        }}
        className="w-full space-y-4"
      >
        <h1 className="text-2xl font-semibold">Login</h1>

        <div className="flex flex-col gap-3">
          <form.Field
            name="email"
            validators={{
              onBlur: ({ value }) => {
                const email = value.trim();
                if (email.length === 0) return 'Email is required';
                const isValidEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
                return isValidEmail ? undefined : 'Enter a valid email address';
              },
            }}
          >
            {(field) => (
              <div>
                <label
                  htmlFor={field.name}
                  className="my-0 block text-sm font-medium text-muted-foreground"
                >
                  Email
                </label>
                <Input
                  required
                  type="email"
                  name={field.name}
                  autoComplete="email"
                  value={field.state.value}
                  onBlur={field.handleBlur}
                  onChange={(e) => field.handleChange(e.currentTarget.value)}
                />

                {!field.state.meta.isValid && (
                  <p className="pt-1 text-xs text-red-500">{field.state.meta.errors.join(', ')}</p>
                )}
              </div>
            )}
          </form.Field>

          <form.Field
            name="password"
            validators={{
              onBlur: ({ value }) => (value.length === 0 ? 'Password is required' : undefined),
            }}
          >
            {(field) => (
              <div>
                <label
                  htmlFor={field.name}
                  className="my-0 block text-sm font-medium text-muted-foreground"
                >
                  Password
                </label>
                <PasswordInput
                  required
                  name={field.name}
                  autoComplete="current-password"
                  value={field.state.value}
                  onBlur={field.handleBlur}
                  onChange={(e) => field.handleChange(e.currentTarget.value)}
                />
                {!field.state.meta.isValid && (
                  <p className="pt-1 text-xs text-red-500">{field.state.meta.errors.join(', ')}</p>
                )}
              </div>
            )}
          </form.Field>
        </div>
        {error ? <p className="my-2 text-sm text-red-500">{error}</p> : null}

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
