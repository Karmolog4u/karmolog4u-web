import { web_site } from '@/helper/consts';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Навчання',
  description: 'Навчання | Адмін',

  metadataBase: new URL(web_site),

  alternates: {
    canonical: '/cabinet/dashboard/admin/education',
    languages: {
      'uk-UA': '/uk/cabinet/dashboard/admin/education',
      'ru-RU': '/ru/cabinet/dashboard/admin/education',
    },
  },

  openGraph: {
    title: 'Навчання',
    description: 'Навчання | Адмін',
    url: '/cabinet/dashboard/admin/education',
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
    description: 'Навчання | Адмін',
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
