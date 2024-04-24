'use client';
import { useFormStatus } from 'react-dom';
import { Button } from './ui/button';

type SubmitButtonProps = Partial<{
  loadingText: string;
  text: string;
  disabled?: boolean;
  className?: string;
}>;

export const SubmitButton = ({
  loadingText = 'Loading...',
  text = 'Submit',
  disabled = false,
  className,
}: SubmitButtonProps) => {
  const { pending } = useFormStatus();

  return (
    <Button
      disabled={pending || disabled}
      aria-disabled={pending}
      className={className}
      type="submit"
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
