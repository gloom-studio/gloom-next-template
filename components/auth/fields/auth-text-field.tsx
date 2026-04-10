'use client';

import type { AnyFieldApi } from '@tanstack/react-form';

import { Input } from '@/components/ui/input';

import { formatFieldErrors } from './format-field-errors';

type AuthTextFieldProps = {
  field: AnyFieldApi;
  label: string;
  type?: 'text' | 'email';
  autoComplete?: string;
};

export function AuthTextField({ field, label, type = 'text', autoComplete }: AuthTextFieldProps) {
  return (
    <div>
      <label htmlFor={field.name} className="my-0 block text-sm font-medium text-muted-foreground">
        {label}
      </label>
      <Input
        required
        type={type}
        name={field.name}
        autoComplete={autoComplete}
        value={field.state.value}
        onBlur={field.handleBlur}
        onChange={(e) => field.handleChange(e.currentTarget.value)}
      />
      {!field.state.meta.isValid && (
        <p className="pt-1 text-xs text-red-500">{formatFieldErrors(field.state.meta.errors)}</p>
      )}
    </div>
  );
}
