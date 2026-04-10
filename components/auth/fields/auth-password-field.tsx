'use client';

import type { AnyFieldApi } from '@tanstack/react-form';

import { PasswordInput } from '@/components/ui/password-input';

import { formatFieldErrors } from './format-field-errors';

type AuthPasswordFieldProps = {
  field: AnyFieldApi;
  label: string;
  autoComplete: string;
  /** Register page passes extra border classes on password fields */
  className?: string;
  showErrors?: boolean;
};

export function AuthPasswordField({
  field,
  label,
  autoComplete,
  className,
  showErrors = true,
}: AuthPasswordFieldProps) {
  return (
    <div>
      <label htmlFor={field.name} className="my-0 block text-sm font-medium text-muted-foreground">
        {label}
      </label>
      <PasswordInput
        required
        name={field.name}
        autoComplete={autoComplete}
        value={field.state.value}
        onBlur={field.handleBlur}
        onChange={(e) => field.handleChange(e.currentTarget.value)}
        className={className}
      />
      {showErrors && !field.state.meta.isValid && (
        <p className="pt-1 text-xs text-red-500">{formatFieldErrors(field.state.meta.errors)}</p>
      )}
    </div>
  );
}
