const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function isValidEmail(value: string): boolean {
  return EMAIL_REGEX.test(value.trim());
}

/** TanStack field validator: blur-friendly email check */
export function validateEmailOnBlur(value: string): string | undefined {
  const email = value.trim();
  if (email.length === 0) return 'Email is required';
  return isValidEmail(email) ? undefined : 'Enter a valid email address';
}

export function validateRequired(fieldLabel: string, value: string): string | undefined {
  return value.length === 0 ? `${fieldLabel} is required` : undefined;
}

export function isStrongPassword(password: string): boolean {
  const checks = getPasswordChecks(password);
  return checks.minLength && checks.lowercase && checks.uppercase && checks.number && checks.symbol;
}

export function getPasswordChecks(password: string) {
  return {
    minLength: password.length >= 8,
    lowercase: /[a-z]/.test(password),
    uppercase: /[A-Z]/.test(password),
    number: /[0-9]/.test(password),
    symbol: /[^\w\s]/.test(password),
  };
}

export function passwordsMatch(password: string, passwordConfirmation: string): boolean {
  return password === passwordConfirmation;
}

export const PASSWORD_POLICY_FIELD_MESSAGE =
  'Must be 8+ chars with lowercase, uppercase, number, and symbol';

export const PASSWORD_POLICY_SUBMIT_MESSAGE =
  'Password must be at least 8 characters and include 1 lowercase, 1 uppercase, 1 number, and 1 symbol.';

export function validatePasswordStrengthOnChange(value: string): string | undefined {
  if (value.length === 0) return 'Password is required';
  return isStrongPassword(value) ? undefined : PASSWORD_POLICY_FIELD_MESSAGE;
}

export type RegisterFormValues = {
  password: string;
  passwordConfirmation: string;
};

/** Form-level onChange validator for password + confirmation match */
export function validateRegisterPasswordMatch(
  value: RegisterFormValues,
): { passwordConfirmation: string } | undefined {
  if (value.passwordConfirmation.length === 0) {
    return { passwordConfirmation: 'Password confirmation is required' };
  }
  if (value.password !== value.passwordConfirmation) {
    return { passwordConfirmation: 'Password confirmation does not match.' };
  }
  return undefined;
}
