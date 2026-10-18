import { web_site } from '@/helper/consts';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Створити курс',
  description: 'Створити курс | Адмін',

  metadataBase: new URL(web_site),

  alternates: {
    canonical: '/cabinet/dashboard/admin/education/add_course',
    languages: {
      'uk-UA': '/uk/cabinet/dashboard/admin/education/add_course',
      'ru-RU': '/ru/cabinet/dashboard/admin/education/add_course',
    },
  },

  openGraph: {
    title: 'Створити курс',
    description: 'Створити курс | Адмін',
    url: '/cabinet/dashboard/admin/education/add_course',
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
    title: 'Створити курс',
    description: 'Створити курс | Адмін',
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
