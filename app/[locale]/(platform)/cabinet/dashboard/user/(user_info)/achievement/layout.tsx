import type { Metadata } from 'next';
import { web_site } from '@/helper/consts';

export const metadata: Metadata = {
  title: 'Мої досягнення',
  description: 'Мої досягнення | Користувач',

  metadataBase: new URL(web_site),

  alternates: {
    canonical: '/cabinet/dashboard/user/achievement',
    languages: {
      'uk-UA': '/uk/cabinet/dashboard/user/achievement',
      'ru-RU': '/ru/cabinet/dashboard/user/achievement',
    },
  },

  openGraph: {
    title: 'Мої досягнення',
    description: 'Мої досягнення | Користувач',
    url: '/cabinet/dashboard/user/achievement',
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
    title: 'Мої досягнення',
    description: 'Мої досягнення | Користувач',
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
