import NextAuth from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
import { base_url, web_site } from '@/helper/consts';

export const { handlers, signIn, signOut, auth } = NextAuth({
  session: {
    strategy: 'jwt', // Використовуємо JWT для зберігання сесії
  },
  providers: [
    Credentials({
      name: 'credentials',
      credentials: {
        email: {},
        password: {},
      },
      async authorize(credentials) {
        try {
          const res = await fetch(`${base_url}/auth/login`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              email: credentials.email,
              password: credentials.password,
            }),
          });

          if (!res.ok) {
            console.log('not ok');
            return null;
          }

          const user = await res.json();

          if (!user) {
            throw new Error('Invalid login response');
          }

          return user.user;
        } catch (error) {
          console.error('Authorization error:', error);
          return null;
        }
      },
    }),
  ],
  pages: {
    signIn: '/cabinet/login',
    signOut: '/cabinet/login',
  },
  callbacks: {
    authorized: async ({ auth }) => {
      // Logged in users are authenticated, otherwise redirect to login page
      return !!auth;
    },
    async jwt({ token, user }) {
      const ONE_HOUR = 60 * 60 * 1000;
      const now = Date.now();
      if (user) {
        token.accessToken = user.accessToken;
        token.refreshToken = user.refreshToken;
        token.role = user.userData?.role;
        token.expiresAt = now + ONE_HOUR;
      }

      if (token.expiresAt && now > token.expiresAt) {
        try {
          const refreshResponse = await fetch(`${base_url}/auth/refresh-token`, {
            method: 'POST',
            headers: {
              Authorization: `Bearer ${token.refreshToken}`,
            },
          });

          if (refreshResponse.ok) {
            const newTokens = await refreshResponse.json();
            token.accessToken = newTokens.accessToken;
            token.refreshToken = newTokens.refreshToken;
            token.expiresAt = now + ONE_HOUR;
            token.expiresAt = expiresAt; // Оновлення часу закінчення дії
            console.log('refreshed at ', new Date(Date.now()));
          } else {
            console.error('Failed to refresh token:', refreshResponse);
            // Якщо не вдалося оновити токен, повертаємо null
            return null;
          }
        } catch (error) {
          console.log('Error during token refresh:', error);
        }
      }

      return token;
    },
    async session({ session, token }) {
      // Додаємо роль користувача та токени до сесії
      if (token) {
        session.user.role = token.role;
        session.accessToken = token.accessToken;
        session.refreshToken = token.refreshToken;
      }
      return session;
    },
    async redirect() {
      return `${web_site}/cabinet/dashboard`; // Для інших користувачів
    },
  },
});
