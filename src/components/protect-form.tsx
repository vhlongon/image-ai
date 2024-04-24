'use client';

import { checkPasswordAction } from '@/app/actions/check-password';
import { useSearchParams } from 'next/navigation';
import { useId } from 'react';
import { useFormState } from 'react-dom';
import { ErrorMessage } from './error-message';
import { SubmitButton } from './submit-button';
import { Input } from './ui/input';

export const ProtectForm = () => {
  const id = useId();
  const searchParms = useSearchParams();
  const [state, formAction] = useFormState(checkPasswordAction, undefined);

  return (
    <div className="min-w-72 max-w-lg">
      <h1 className="text-3xl font-bold mb-4 card-title text-center">
        Enter password
      </h1>
      <form action={formAction} className="flex flex-col gap-4" id={id}>
        <input
          type="hidden"
          id="redirect"
          name="redirect"
          value={searchParms.get('redirect') ?? '/home'}
        />
        <div className="form-control w-full max-w-xs">
          <Input
            type="password"
            name="password"
            id="password"
            placeholder="******"
            className=""
            required
          />
        </div>
        <SubmitButton loadingText="Verifying..." text="Submit" />
        {state?.error && <ErrorMessage>{state.error}</ErrorMessage>}
      </form>
    </div>
  );
};
