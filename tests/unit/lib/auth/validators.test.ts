import { describe, expect, it } from 'vitest';

import {
  isStrongPassword,
  isValidEmail,
  passwordsMatch,
  validateEmailOnBlur,
  validateRegisterPasswordMatch,
  validateRequired,
} from '@/lib/auth/validators';

describe('auth validators', () => {
  it('validateRequired', () => {
    expect(validateRequired('Name', '')).toBe('Name is required');
    expect(validateRequired('Name', 'a')).toBeUndefined();
  });

  it('validateEmailOnBlur', () => {
    expect(validateEmailOnBlur('')).toBe('Email is required');
    expect(validateEmailOnBlur('not-an-email')).toBe('Enter a valid email address');
    expect(validateEmailOnBlur('  user@example.com  ')).toBeUndefined();
  });

  it('isValidEmail', () => {
    expect(isValidEmail('user@example.com')).toBe(true);
    expect(isValidEmail('bad')).toBe(false);
  });

  it('isStrongPassword', () => {
    expect(isStrongPassword('short')).toBe(false);
    expect(isStrongPassword('Aa1!aaaa')).toBe(true);
  });

  it('passwordsMatch', () => {
    expect(passwordsMatch('a', 'a')).toBe(true);
    expect(passwordsMatch('a', 'b')).toBe(false);
  });

  it('validateRegisterPasswordMatch', () => {
    expect(validateRegisterPasswordMatch({ password: 'x', passwordConfirmation: '' })).toEqual({
      passwordConfirmation: 'Password confirmation is required',
    });
    expect(validateRegisterPasswordMatch({ password: 'x', passwordConfirmation: 'y' })).toEqual({
      passwordConfirmation: 'Password confirmation does not match.',
    });
    expect(
      validateRegisterPasswordMatch({ password: 'x', passwordConfirmation: 'x' }),
    ).toBeUndefined();
  });
});
