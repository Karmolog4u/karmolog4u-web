import { web_site } from '@/helper/consts';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Події',
  description: 'Події | Адмін',

  metadataBase: new URL(web_site),

  alternates: {
    canonical: '/cabinet/dashboard/admin/events',
    languages: {
      'uk-UA': '/uk/cabinet/dashboard/admin/events',
      'ru-RU': '/ru/cabinet/dashboard/admin/events',
    },
  },

  openGraph: {
    title: 'Події',
    description: 'Події | Адмін',
    url: '/cabinet/dashboard/admin/events',
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
    description: 'Події | Адмін',
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
