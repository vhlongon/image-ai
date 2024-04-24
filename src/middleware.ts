import { NextRequest, NextResponse } from 'next/server';
import { isValidProtectPasswordInCookies } from './lib/protect';

export const middleware = async (req: NextRequest) => {
  const isAuthorized = isValidProtectPasswordInCookies();
  const pathname = req.nextUrl.pathname;
  const isRoot = pathname === '/';

  if (isRoot) {
    return NextResponse.next();
  }

  if (!isAuthorized) {
    const url = new URL('/', req.url);
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
};

export const config = {
  matcher: ['/((?!.*\\..*|_next).*)', '/', '/(api|trpc)(.*)'],
};
