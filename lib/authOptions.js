import CredentialsProvider from 'next-auth/providers/credentials';
import { base_url } from '@/helper/consts';

export const authOptions = {
  session: {
    strategy: 'jwt',
    maxAge: 30 * 24 * 60 * 60,
  },
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'text' },
        password: { label: 'Password', type: 'password' },
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
            const errorBody = await res.text();
            console.error('[AUTH] API error response:', errorBody);
            console.log('not ok');
            return null;
          }

          const user = await res.json();
          if (!user) throw new Error('Invalid login response');
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
    async jwt({ token, user, trigger }) {
      const ONE_HOUR = 60 * 60 * 1000;
      const now = Date.now();
      if (user) {
        token.accessToken = user.accessToken;
        token.refreshToken = user.refreshToken;
        token.role = user.userData?.role;
        token.name = user.userData?.name;
        token.lastName = user.userData?.lastName;
        token.email = user.userData?.email;
        token.id = user.userData?.id;
        token.mobPhone = user.userData?.mobPhone;
        token.expiresAt = now + ONE_HOUR;
        token.cover = user.userData?.cover || '';
      }

      if (trigger === 'update') {
        try {
          const refreshResponse = await fetch(`${base_url}/user/info`, {
            method: 'GET',
            headers: {
              Authorization: `Bearer ${token.accessToken}`,
            },
          });
          if (refreshResponse.ok) {
            const userData = await refreshResponse.json();

            token.name = userData.name;
            token.lastName = userData.lastName;
            token.email = userData.email;
            token.mobPhone = userData.mobPhone;
            token.cover = userData.cover;
          }
        } catch (error) {
          console.error('Error fetching user info:', error);
        }
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
      if (token) {
        session.user.role = token.role;
        session.user.name = token.name;
        session.user.lastName = token.lastName;
        session.user.email = token.email;
        session.user.mobPhone = token.mobPhone;
        session.user.id = token.id;
        session.accessToken = token.accessToken;
        session.refreshToken = token.refreshToken;
        session.user.cover = token.cover;
      }
      return session;
    },
    async redirect({ baseUrl }) {
      return `${baseUrl}/cabinet/dashboard`;
    },
  },
};
