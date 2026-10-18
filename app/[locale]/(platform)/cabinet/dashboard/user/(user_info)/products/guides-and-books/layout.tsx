import type { Metadata } from 'next';
import { web_site } from '@/helper/consts';

export const metadata: Metadata = {
  title: 'Гайди та книги',
  description: 'Гайди та книги | Користувач',

  metadataBase: new URL(web_site),

  alternates: {
    canonical: '/cabinet/dashboard/user/products/guides-and-books',
    languages: {
      'uk-UA': '/uk/cabinet/dashboard/user/products/guides-and-books',
      'ru-RU': '/ru/cabinet/dashboard/user/products/guides-and-books',
    },
  },

  openGraph: {
    title: 'Гайди та книги',
    description: 'Гайди та книги | Користувач',
    url: '/cabinet/dashboard/user/products/guides-and-books',
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
    title: 'Гайди та книги',
    description: 'Гайди та книги | Користувач',
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
