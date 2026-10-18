import { web_site } from '@/helper/consts';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Відділ турботи',
  description: 'Відділ турботи | Користувач',

  metadataBase: new URL(web_site),

  alternates: {
    canonical: '/cabinet/dashboard/user/support',
    languages: {
      'uk-UA': '/uk/cabinet/dashboard/user/support',
      'ru-RU': '/ru/cabinet/dashboard/user/support',
    },
  },

  openGraph: {
    title: 'Відділ турботи',
    description: 'Відділ турботи | Користувач',
    url: '/cabinet/dashboard/user/support',
    siteName: 'Karmolog4u',
    type: 'website',
    locale: 'uk_UA',
    images: [
      {
        url: '/opengraph-image.png',
        width: 1200,
        height: 1200,
        alt: 'Karmolog4u',
      },
    ],
  },

  twitter: {
    title: 'Відділ турботи',
    description: 'Відділ турботи | Користувач',
    images: ['/twitter-image.png'],
  },

  robots: {
    index: false,
    follow: false,
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
