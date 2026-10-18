import type { Metadata } from 'next';
import { web_site } from '@/helper/consts';

export const metadata: Metadata = {
  title: 'Навчання',
  description: 'Навчання | Користувач',

  metadataBase: new URL(web_site),

  alternates: {
    canonical: '/cabinet/dashboard/user/education',
    languages: {
      'uk-UA': '/uk/cabinet/dashboard/user/education',
      'ru-RU': '/ru/cabinet/dashboard/user/education',
    },
  },

  openGraph: {
    title: 'Навчання',
    description: 'Навчання | Користувач',
    url: '/cabinet/dashboard/user/education',
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
    title: 'Навчання',
    description: 'Навчання | Користувач',
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
