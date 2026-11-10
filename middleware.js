import { getToken } from 'next-auth/jwt';
import createMiddleware from 'next-intl/middleware';
import { localeConfig } from './i18n/config';

const intlMiddleware = createMiddleware(localeConfig);

export default async function middleware(req) {
  const { pathname } = req.nextUrl;
  const isCabinetPath = /(?:^|\/)cabinet(?:\/|$)/.test(pathname);
  const token = isCabinetPath ? await getToken({ req, secret: process.env.AUTH_SECRET }) : null;

  // === Спочатку перевіряємо авторизацію
  const isPublicPage =
    pathname.includes('/cabinet/login') ||
    pathname.includes('/cabinet/registration') ||
    pathname.includes('/cabinet/reset-password') ||
    pathname.includes('/cabinet/verify') ||
    pathname.includes('/cabinet/resent-verification');

  // Обмеження доступу до /cabinet сторінок
  if (pathname.includes('/cabinet') && !isPublicPage && !token) {
    return Response.redirect(new URL('/cabinet/login', req.url));
  }

  // Редіректи для авторизованих користувачів
  if (pathname.includes('/cabinet/login') && token) {
    return Response.redirect(new URL('/cabinet/dashboard', req.url));
  }

  if (token?.role === 'ADMIN' && pathname.includes('dashboard/user')) {
    return Response.redirect(new URL('/cabinet/dashboard', req.url));
  }

  if (token?.role === 'USER' && pathname.includes('dashboard/admin')) {
    return Response.redirect(new URL('/cabinet/dashboard', req.url));
  }

  // === У САМОМУ КІНЦІ: запускаємо next-intl (останній, обовʼязковий крок)
  return intlMiddleware(req);
}

export const config = {
  matcher: ['/((?!api|_next|public|.*\\..*).*)'],
};
