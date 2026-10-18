import type { Metadata } from 'next';
import { web_site } from '@/helper/consts';

export const metadata: Metadata = {
  title: 'Медитації',
  description: 'Список медитацій | Адмін',

  metadataBase: new URL(web_site),

  alternates: {
    canonical: '/cabinet/dashboard/admin/products/meditations',
    languages: {
      'uk-UA': '/uk/cabinet/dashboard/admin/products/meditations',
      'ru-RU': '/ru/cabinet/dashboard/admin/products/meditations',
    },
  },

  openGraph: {
    title: 'Медитації',
    description: 'Список медитацій | Адмін',
    url: '/cabinet/dashboard/admin/products/meditations',
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
    title: 'Медитації',
    description: 'Список медитацій | Адмін',
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
