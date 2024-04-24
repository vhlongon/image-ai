import { ExclamationTriangleIcon } from '@radix-ui/react-icons';
import { ReactNode } from 'react';
import { Alert, AlertDescription, AlertTitle } from './ui/alert';

export const ErrorMessage = ({ children }: { children: ReactNode }) => {
  return (
    <Alert variant="destructive">
      <ExclamationTriangleIcon className="h-4 w-4" />
      <AlertTitle>Error</AlertTitle>
      <AlertDescription>{children}</AlertDescription>
    </Alert>
  );
};
