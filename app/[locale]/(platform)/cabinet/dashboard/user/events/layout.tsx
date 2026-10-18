import { web_site } from '@/helper/consts';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Події',
  description: 'Події | Користувач',

  metadataBase: new URL(web_site),

  alternates: {
    canonical: '/cabinet/dashboard/user/events',
    languages: {
      'uk-UA': '/uk/cabinet/dashboard/user/events',
      'ru-RU': '/ru/cabinet/dashboard/user/events',
    },
  },

  openGraph: {
    title: 'Події',
    description: 'Події | Користувач',
    url: '/cabinet/dashboard/user/events',
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
    title: 'Події',
    description: 'Події | Користувач',
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
