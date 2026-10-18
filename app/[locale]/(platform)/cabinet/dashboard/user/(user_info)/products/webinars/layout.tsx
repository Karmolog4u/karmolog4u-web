import { web_site } from '@/helper/consts';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Вебінари',
  description: 'Вебінари | Користувач',

  metadataBase: new URL(web_site),

  alternates: {
    canonical: '/cabinet/dashboard/user/products/webinars',
    languages: {
      'uk-UA': '/uk/cabinet/dashboard/user/products/webinars',
      'ru-RU': '/ru/cabinet/dashboard/user/products/webinars',
    },
  },

  openGraph: {
    title: 'Вебінари',
    description: 'Вебінари | Користувач',
    url: '/cabinet/dashboard/user/products/webinars',
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
    title: 'Вебінари',
    description: 'Вебінари | Користувач',
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
