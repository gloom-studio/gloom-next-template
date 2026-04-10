import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import { AuthFormError } from '@/components/auth/forms/auth-form-error';

describe('AuthFormError', () => {
  it('renders nothing when message is null', () => {
    const { container } = render(<AuthFormError message={null} />);
    expect(container).toBeEmptyDOMElement();
  });

  it('renders message with default classes', () => {
    render(<AuthFormError message="Something went wrong" />);
    const el = screen.getByText('Something went wrong');
    expect(el).toBeInTheDocument();
    expect(el.className).toContain('text-red-500');
  });

  it('respects custom className', () => {
    render(<AuthFormError message="Oops" className="text-sm text-red-500" />);
    expect(screen.getByText('Oops').className).toContain('text-sm');
  });
});
