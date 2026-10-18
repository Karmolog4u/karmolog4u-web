import type { Metadata } from 'next';
import { web_site } from '@/helper/consts';

export const metadata: Metadata = {
  title: 'Особисті дані',
  description: 'Особисті дані | Користувач',

  metadataBase: new URL(web_site),

  alternates: {
    canonical: '/cabinet/dashboard/user/personal',
    languages: {
      'uk-UA': '/uk/cabinet/dashboard/user/personal',
      'ru-RU': '/ru/cabinet/dashboard/user/personal',
    },
  },

  openGraph: {
    title: 'Особисті дані',
    description: 'Особисті дані | Користувач',
    url: '/cabinet/dashboard/user/personal',
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
    title: 'Особисті дані',
    description: 'Особисті дані | Користувач',
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
