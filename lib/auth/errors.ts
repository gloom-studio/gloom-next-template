export function getAuthErrorMessage(
  error: { message?: string } | null | undefined,
  fallback: string,
): string {
  return error?.message ?? fallback;
}
