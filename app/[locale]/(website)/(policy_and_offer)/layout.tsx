import { ReactNode } from 'react';

import { web_site } from '@/helper/consts';

export async function generateMetadata() {
  return {
    metadataBase: new URL(web_site),
    title: 'Вхід в особистий кабінет',
    description: 'Вхід в особистий кабінет',

    alternates: {
      canonical: '/',
      languages: {
        'uk-UA': `/uk`,
        'ru-Ru': '/ru',
      },
    },
    openGraph: {
      title: 'Login',
      description: 'Вхід в особистий кабінет',
      url: '/',
      siteName: 'Karmolog4u',
      images: [
        {
          url: `/opengraph-image.png`,
          width: 600,
          height: 600,
        },
        {
          url: '/opengraph-image.png',
          width: 1200,
          height: 1200,
          alt: 'Custom alt',
        },
      ],
      locale: 'uk',
      type: 'website',
    },
    robots: {
      index: false,
      follow: true,
      nocache: true,
      googleBot: {
        index: true,
        follow: false,
        noimageindex: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
    twitter: {
      title: 'Login',
      description: 'Вхід в особистий кабінет',

      images: ['/twitter-image.png'],
    },
    manifest: '/manifest.json',
    icons: {
      icon: '/icon.ico',
      shortcut: '/favicon.ico',
      apple: '/apple-touch-icon.png',
      other: [
        {
          rel: 'apple-touch-icon-precomposed',
          url: '/apple-touch-icon-precomposed.png',
        },
      ],
    },
    other: {
      'msapplication-config': '/browserconfig.xml',
    },
  };
}

export const viewport = {
  themeColor: 'black',
};

const PolicyAndOfferLayout = ({ children }: { children: ReactNode }) => {
  return <main>{children}</main>;
};

export default PolicyAndOfferLayout;
