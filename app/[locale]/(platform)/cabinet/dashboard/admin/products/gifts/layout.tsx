import { web_site } from '@/helper/consts';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Подарунки студії',
  description: 'Список подарунків | Адмін',

  metadataBase: new URL(web_site),

  alternates: {
    canonical: '/cabinet/dashboard/admin/products/gifts',
    languages: {
      'uk-UA': '/uk/cabinet/dashboard/admin/products/gifts',
      'ru-RU': '/ru/cabinet/dashboard/admin/products/gifts',
    },
  },

  openGraph: {
    title: 'Подарунки студії',
    description: 'Список подарунків | Адмін',
    url: '/cabinet/dashboard/admin/products/gifts',
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
    title: 'Подарунки студії',
    description: 'Список подарунків | Адмін',
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
