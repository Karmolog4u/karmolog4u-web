import type { Metadata } from 'next';
import { web_site } from '@/helper/consts';

export const metadata: Metadata = {
  title: 'Додати подію',
  description: 'Додати подію | Адмін',

  metadataBase: new URL(web_site),

  alternates: {
    canonical: '/cabinet/dashboard/admin/events/add',
    languages: {
      'uk-UA': '/uk/cabinet/dashboard/admin/events/add',
      'ru-RU': '/ru/cabinet/dashboard/admin/events/add',
    },
  },

  openGraph: {
    title: 'Додати подію',
    description: 'Додати подію | Адмін',
    url: '/cabinet/dashboard/admin/events/add',
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
    title: 'Додати подію',
    description: 'Додати подію | Адмін',
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
