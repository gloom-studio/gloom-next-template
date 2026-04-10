'use client';

import type { ReactFormExtendedApi } from '@tanstack/react-form';

/**
 * Widened so login/register `useForm` return types stay assignable (validator generics are
 * inferred as `FormValidateOrFn<...> | undefined`, not plain `undefined`).
 */
type AuthFormSubscribe = Pick<
  // eslint-disable-next-line @typescript-eslint/no-explicit-any -- TanStack form shape varies per form
  ReactFormExtendedApi<any, any, any, any, any, any, any, any, any, any, any, any>,
  'Subscribe'
>;

type AuthSubmitButtonProps = {
  form: AuthFormSubscribe;
  idleLabel: string;
  submittingLabel: string;
};

export function AuthSubmitButton({ form, idleLabel, submittingLabel }: AuthSubmitButtonProps) {
  return (
    <form.Subscribe
      selector={(state: { canSubmit: boolean; isSubmitting: boolean }) =>
        [state.canSubmit, state.isSubmitting] as const
      }
    >
      {([canSubmit, isSubmitting]: readonly [boolean, boolean]) => (
        <button
          type="submit"
          disabled={!canSubmit}
          className="w-full rounded-md bg-foreground px-3 py-2 text-background disabled:opacity-60"
        >
          {isSubmitting ? submittingLabel : idleLabel}
        </button>
      )}
    </form.Subscribe>
  );
}
