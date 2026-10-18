import type { Metadata } from 'next';
import { web_site } from '@/helper/consts';

export const metadata: Metadata = {
  title: 'Видалені продукти',
  description: 'Видалені продукти | Адмін',

  metadataBase: new URL(web_site),

  alternates: {
    canonical: '/cabinet/dashboard/admin/deleted',
    languages: {
      'uk-UA': '/uk/cabinet/dashboard/admin/deleted',
      'ru-RU': '/ru/cabinet/dashboard/admin/deleted',
    },
  },

  openGraph: {
    title: 'Видалені продукти',
    description: 'Видалені продукти | Адмін',
    url: '/cabinet/dashboard/admin/deleted',
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
    title: 'Видалені продукти',
    description: 'Видалені продукти | Адмін',
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
