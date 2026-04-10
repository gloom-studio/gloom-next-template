'use client';

import { Check, Circle, X } from 'lucide-react';
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
  const [loading, setLoading] = useState(false);
  const [password, setPassword] = useState('');
  const [passwordConfirmation, setPasswordConfirmation] = useState('');

  const passwordChecks = {
    minLength: password.length >= 8,
    lowercase: /[a-z]/.test(password),
    uppercase: /[A-Z]/.test(password),
    number: /[0-9]/.test(password),
    symbol: /[^\w\s]/.test(password),
  };
  const showChecklist = password.length > 0;
  const passwordsMatch = passwordConfirmation.length > 0 && password === passwordConfirmation;

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError(null);
    setLoading(true);

    const formData = new FormData(event.currentTarget);
    const name = getField(formData, 'name');
    const email = getField(formData, 'email');
    const submittedPassword = password;
    const submittedPasswordConfirmation = passwordConfirmation;

    if (!isStrongPassword(submittedPassword)) {
      setError(
        'Password must be at least 8 characters and include 1 lowercase, 1 uppercase, 1 number, and 1 symbol.',
      );
      setLoading(false);
      return;
    }

    if (submittedPassword !== submittedPasswordConfirmation) {
      setError('Password confirmation does not match.');
      setLoading(false);
      return;
    }

    const { error: signUpError } = await authClient.signUp.email({
      name,
      email,
      password: submittedPassword,
    });

    setLoading(false);

    if (signUpError) {
      setError(signUpError.message ?? 'Could not create account.');
      return;
    }

    router.push('/dashboard');
    router.refresh();
  }

  return (
    <main className="mx-auto flex min-h-screen w-full max-w-md items-center px-6 py-12">
      <form onSubmit={onSubmit} className="w-full space-y-4">
        <h1 className="text-2xl font-semibold">Register</h1>

        <Input
          required
          type="text"
          name="name"
          placeholder="Name"
          autoComplete="name"
          className="w-full rounded-md border px-3 py-2"
        />
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
          autoComplete="new-password"
          className="w-full rounded-md border px-3 py-2"
          value={password}
          onChange={(e) => setPassword(e.currentTarget.value)}
        />
        <PasswordInput
          required
          name="passwordConfirmation"
          placeholder="Password Confirmation"
          autoComplete="new-password"
          className="w-full rounded-md border px-3 py-2"
          value={passwordConfirmation}
          onChange={(e) => setPasswordConfirmation(e.currentTarget.value)}
        />

        {showChecklist ? (
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
        ) : null}

        {error ? <p className="text-sm text-red-500">{error}</p> : null}

        <button
          type="submit"
          disabled={loading}
          className="w-full rounded-md bg-foreground px-3 py-2 text-background disabled:opacity-60"
        >
          {loading ? 'Creating account...' : 'Create account'}
        </button>

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
