'use client';

import { useForm } from '@tanstack/react-form';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

import { AuthPasswordField } from '@/components/auth/fields/auth-password-field';
import { AuthTextField } from '@/components/auth/fields/auth-text-field';
import { authClient } from '@/lib/auth-client';
import { getAuthErrorMessage } from '@/lib/auth/errors';
import { validateEmailOnBlur, validateRequired } from '@/lib/auth/validators';

import { AuthFormError } from './auth-form-error';
import { AuthSubmitButton } from './auth-submit-button';

export function LoginForm() {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);

  const form = useForm({
    defaultValues: {
      email: '',
      password: '',
    },
    onSubmit: async ({ value }) => {
      setError(null);

      const { error: signInError } = await authClient.signIn.email({
        email: value.email,
        password: value.password,
      });

      if (signInError) {
        setError(getAuthErrorMessage(signInError, 'Invalid email or password.'));
        return;
      }

      router.push('/dashboard');
      router.refresh();
    },
  });

  return (
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
            onBlur: ({ value }) => validateEmailOnBlur(value),
          }}
        >
          {(field) => (
            <AuthTextField field={field} label="Email" type="email" autoComplete="email" />
          )}
        </form.Field>

        <form.Field
          name="password"
          validators={{
            onBlur: ({ value }) => validateRequired('Password', value),
          }}
        >
          {(field) => (
            <AuthPasswordField field={field} label="Password" autoComplete="current-password" />
          )}
        </form.Field>
      </div>

      <AuthFormError message={error} />

      <AuthSubmitButton form={form} idleLabel="Login" submittingLabel="Logging in..." />

      <p className="text-sm text-muted-foreground">
        No account?{' '}
        <Link href="/register" className="underline">
          Register
        </Link>
      </p>
    </form>
  );
}
