'use client';

import { useForm } from '@tanstack/react-form';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

import { AuthPasswordField } from '@/components/auth/fields/auth-password-field';
import { AuthTextField } from '@/components/auth/fields/auth-text-field';
import { PasswordRequirements } from '@/components/auth/fields/password-requirements';
import { authClient } from '@/lib/auth-client';
import { getAuthErrorMessage } from '@/lib/auth/errors';
import {
  isStrongPassword,
  PASSWORD_POLICY_SUBMIT_MESSAGE,
  passwordsMatch,
  validateEmailOnBlur,
  validatePasswordStrengthOnChange,
  validateRegisterPasswordMatch,
  validateRequired,
} from '@/lib/auth/validators';

import { AuthFormError } from './auth-form-error';
import { AuthSubmitButton } from './auth-submit-button';

export function RegisterForm() {
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
      onChange: ({ value }) => validateRegisterPasswordMatch(value),
    },
    onSubmit: async ({ value }) => {
      setError(null);

      if (!isStrongPassword(value.password)) {
        setError(PASSWORD_POLICY_SUBMIT_MESSAGE);
        return;
      }

      if (!passwordsMatch(value.password, value.passwordConfirmation)) {
        setError('Password confirmation does not match.');
        return;
      }

      const { error: signUpError } = await authClient.signUp.email({
        name: value.name,
        email: value.email,
        password: value.password,
      });

      if (signUpError) {
        setError(getAuthErrorMessage(signUpError, 'Could not create account.'));
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
      <h1 className="text-2xl font-semibold">Register</h1>

      <div className="flex flex-col gap-3">
        <form.Field
          name="name"
          validators={{
            onBlur: ({ value }) => validateRequired('Name', value),
          }}
        >
          {(field) => <AuthTextField field={field} label="Name" type="text" autoComplete="name" />}
        </form.Field>

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
            onChange: ({ value }) => validatePasswordStrengthOnChange(value),
          }}
        >
          {(field) => (
            <AuthPasswordField
              field={field}
              label="Password"
              autoComplete="new-password"
              className="w-full rounded-md border px-3 py-2"
              showErrors={false}
            />
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
            <AuthPasswordField
              field={field}
              label="Confirm Password"
              autoComplete="new-password"
              className="w-full rounded-md border px-3 py-2"
              showErrors={false}
            />
          )}
        </form.Field>

        <form.Subscribe
          selector={(state) => [state.values.password, state.values.passwordConfirmation] as const}
        >
          {([password, passwordConfirmation]) => (
            <PasswordRequirements password={password} passwordConfirmation={passwordConfirmation} />
          )}
        </form.Subscribe>
      </div>

      <AuthFormError message={error} className="text-sm text-red-500" />

      <AuthSubmitButton
        form={form}
        idleLabel="Create account"
        submittingLabel="Creating account..."
      />

      <p className="text-sm text-muted-foreground">
        Already have an account?{' '}
        <Link href="/login" className="underline">
          Login
        </Link>
      </p>
    </form>
  );
}
