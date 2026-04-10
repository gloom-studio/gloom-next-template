'use client';

import { Check, Circle, X } from 'lucide-react';

import { getPasswordChecks, passwordsMatch } from '@/lib/auth/validators';

type PasswordRequirementsProps = {
  password: string;
  passwordConfirmation: string;
};

export function PasswordRequirements({
  password,
  passwordConfirmation,
}: PasswordRequirementsProps) {
  const passwordChecks = getPasswordChecks(password);
  const showChecklist = password.length > 0;
  const passwordsMatchChecklist =
    passwordConfirmation.length > 0 && passwordsMatch(password, passwordConfirmation);

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
      <li className={passwordsMatchChecklist ? 'text-foreground' : undefined}>
        {passwordConfirmation.length === 0 ? (
          <Circle className="inline size-3.5" />
        ) : passwordsMatchChecklist ? (
          <Check className="inline size-3.5 text-green-500" />
        ) : (
          <X className="inline size-3.5 text-red-500" />
        )}{' '}
        Passwords match
      </li>
    </ul>
  );
}
