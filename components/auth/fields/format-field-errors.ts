export function formatFieldErrors(errors: ReadonlyArray<unknown>): string {
  return errors.map((err) => (typeof err === 'string' ? err : String(err))).join(', ');
}
