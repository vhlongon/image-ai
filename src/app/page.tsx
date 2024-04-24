import { ProtectForm } from '@/components/protect-form';
import { isValidProtectPasswordInCookies } from '@/lib/protect';
import { redirect } from 'next/navigation';

export default function RootPage() {
  const isAuthorized = isValidProtectPasswordInCookies();

  if (isAuthorized) {
    redirect('/home');
  }

  return (
    <main>
      <ProtectForm />
    </main>
  );
}
