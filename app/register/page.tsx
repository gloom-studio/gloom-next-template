'use client';

import { useForm } from '@tanstack/react-form';
import { Check, Circle, X } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

import { Input } from '@/components/ui/input';
import { PasswordInput } from '@/components/ui/password-input';
import { authClient } from '@/lib/auth-client';

function isStrongPassword(password: string) {
  const hasMinLength = password.length >= 8;
  const hasLowercase = /[a-z]/.test(password);
  const hasUppercase = /[A-Z]/.test(password);
  const hasNumber = /[0-9]/.test(password);
  const hasSymbol = /[^\w\s]/.test(password);
  return hasMinLength && hasLowercase && hasUppercase && hasNumber && hasSymbol;
}

export default function RegisterPage() {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const form = useForm({
    defaultValues: {
      name: '',
      email: '',
      password: '',
      passwordConfirmation: '',
    },
    validators: {
      onChange: ({ value }) => {
        if (value.passwordConfirmation.length === 0) {
          return { passwordConfirmation: 'Password confirmation is required' };
        }

        if (value.password !== value.passwordConfirmation) {
          return { passwordConfirmation: 'Password confirmation does not match.' };
        }

        return undefined;
      },
    },
    onSubmit: async ({ value }) => {
      setError(null);

      if (!isStrongPassword(value.password)) {
        setError(
          'Password must be at least 8 characters and include 1 lowercase, 1 uppercase, 1 number, and 1 symbol.',
        );
        return;
      }

      if (value.password !== value.passwordConfirmation) {
        setError('Password confirmation does not match.');
        return;
      }

      const { error: signUpError } = await authClient.signUp.email({
        name: value.name,
        email: value.email,
        password: value.password,
      });

      if (signUpError) {
        setError(signUpError.message ?? 'Could not create account.');
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
        <h1 className="text-2xl font-semibold">Register</h1>

        <div className="flex flex-col gap-3">
          <form.Field
            name="name"
            validators={{
              onBlur: ({ value }) => (value.length === 0 ? 'Name is required' : undefined),
            }}
          >
            {(field) => (
              <div>
                <label
                  htmlFor={field.name}
                  className="my-0 block text-sm font-medium text-muted-foreground"
                >
                  Name
                </label>
                <Input
                  required
                  type="text"
                  name={field.name}
                  autoComplete="name"
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
              onChange: ({ value }) =>
                value.length === 0
                  ? 'Password is required'
                  : isStrongPassword(value)
                    ? undefined
                    : 'Must be 8+ chars with lowercase, uppercase, number, and symbol',
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
                  autoComplete="new-password"
                  value={field.state.value}
                  onBlur={field.handleBlur}
                  onChange={(e) => field.handleChange(e.currentTarget.value)}
                  className="w-full rounded-md border px-3 py-2"
                />
              </div>
            )}
          </form.Field>

          <form.Field
            name="passwordConfirmation"
            validators={{
              onChange: ({ value }) =>
                value.length === 0 ? 'Password confirmation is required' : undefined,
            }}
          >
            {(field) => (
              <div>
                <label
                  htmlFor={field.name}
                  className="my-0 block text-sm font-medium text-muted-foreground"
                >
                  Confirm Password
                </label>
                <PasswordInput
                  required
                  name={field.name}
                  autoComplete="new-password"
                  value={field.state.value}
                  onBlur={field.handleBlur}
                  onChange={(e) => field.handleChange(e.currentTarget.value)}
                  className="w-full rounded-md border px-3 py-2"
                />
              </div>
            )}
          </form.Field>
          <form.Subscribe
            selector={(state) => [state.values.password, state.values.passwordConfirmation]}
          >
            {([password, passwordConfirmation]) => {
              const passwordChecks = {
                minLength: password.length >= 8,
                lowercase: /[a-z]/.test(password),
                uppercase: /[A-Z]/.test(password),
                number: /[0-9]/.test(password),
                symbol: /[^\w\s]/.test(password),
              };
              const showChecklist = password.length > 0;
              const passwordsMatch =
                passwordConfirmation.length > 0 && password === passwordConfirmation;

              if (!showChecklist) return null;

              return (
                <ul className="grid grid-cols-2 gap-2 space-y-1 text-xs text-muted-foreground">
                  <li className={passwordChecks.minLength ? 'text-foreground' : undefined}>
                    {passwordChecks.minLength ? (
                      <Check className="inline size-3.5 text-green-500" />
                    ) : (
                      <Circle className="inline size-3.5" />
                    )}{' '}
                    Minimum 8 characters
                  </li>
                  <li className={passwordChecks.lowercase ? 'text-foreground' : undefined}>
                    {passwordChecks.lowercase ? (
                      <Check className="inline size-3.5 text-green-500" />
                    ) : (
                      <Circle className="inline size-3.5" />
                    )}{' '}
                    1 lowercase letter
                  </li>
                  <li className={passwordChecks.uppercase ? 'text-foreground' : undefined}>
                    {passwordChecks.uppercase ? (
                      <Check className="inline size-3.5 text-green-500" />
                    ) : (
                      <Circle className="inline size-3.5" />
                    )}{' '}
                    1 uppercase letter
                  </li>
                  <li className={passwordChecks.number ? 'text-foreground' : undefined}>
                    {passwordChecks.number ? (
                      <Check className="inline size-3.5 text-green-500" />
                    ) : (
                      <Circle className="inline size-3.5" />
                    )}{' '}
                    1 number
                  </li>
                  <li className={passwordChecks.symbol ? 'text-foreground' : undefined}>
                    {passwordChecks.symbol ? (
                      <Check className="inline size-3.5 text-green-500" />
                    ) : (
                      <Circle className="inline size-3.5" />
                    )}{' '}
                    1 symbol
                  </li>
                  <li className={passwordsMatch ? 'text-foreground' : undefined}>
                    {passwordConfirmation.length === 0 ? (
                      <Circle className="inline size-3.5" />
                    ) : passwordsMatch ? (
                      <Check className="inline size-3.5 text-green-500" />
                    ) : (
                      <X className="inline size-3.5 text-red-500" />
                    )}{' '}
                    Passwords match
                  </li>
                </ul>
              );
            }}
          </form.Subscribe>
        </div>

        {error ? <p className="text-sm text-red-500">{error}</p> : null}

        <form.Subscribe selector={(state) => [state.canSubmit, state.isSubmitting]}>
          {([canSubmit, isSubmitting]) => (
            <button
              type="submit"
              disabled={!canSubmit}
              className="w-full rounded-md bg-foreground px-3 py-2 text-background disabled:opacity-60"
            >
              {isSubmitting ? 'Creating account...' : 'Create account'}
            </button>
          )}
        </form.Subscribe>

        <p className="text-sm text-muted-foreground">
          Already have an account?{' '}
          <Link href="/login" className="underline">
            Login
          </Link>
        </p>
      </form>
    </main>
  );
}
