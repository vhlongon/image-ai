'use client';

import { useFormStatus } from 'react-dom';
import { Button } from './ui/button';
import { MouseEventHandler } from 'react';

type SubmitButtonProps = Partial<{
  loadingText: string;
  text: string;
  disabled?: boolean;
  className?: string;
  onClick?: MouseEventHandler<HTMLButtonElement>;
}>;

export const SubmitButton = ({
  loadingText = 'Loading...',
  text = 'Submit',
  disabled = false,
  className,
  onClick,
}: SubmitButtonProps) => {
  const { pending } = useFormStatus();

  return (
    <Button
      disabled={pending || disabled}
      aria-disabled={pending}
      className={className}
      type="submit"
      onClick={onClick}
    >
      {pending ? (
        <>
          <span className="loading loading-spinner" />
          {loadingText}
        </>
      ) : (
        <>{text}</>
      )}
    </Button>
  );
};
