'use client';

type AuthFormErrorProps = {
  message: string | null;
  className?: string;
};

export function AuthFormError({ message, className }: AuthFormErrorProps) {
  if (!message) return null;
  return <p className={className ?? 'my-2 text-sm text-red-500'}>{message}</p>;
}
