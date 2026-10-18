import { getTranslations } from 'next-intl/server';
import { web_site } from '@/helper/consts';

export async function generateMetadata({ params }) {
  const { locale } = await params;

  const t = await getTranslations({
    locale,
    namespace: 'Metadata.Calculator.main',
  });

  return {
    metadataBase: new URL(web_site),
    title: t('title'),
    description: t('description'),

    alternates: {
      canonical: '/',
      languages: {
        'uk-UA': `/uk`,
        'ru-Ru': '/ru',
      },
    },
    openGraph: {
      title: t('title'),
      description: t('description'),
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
      index: true,
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
      // card: "summary_large_image",
      title: t('title'),
      description: t('description'),
      // siteId: "1467726470533754880",
      // creator: "@Karmolog4u",
      // creatorId: "1467726470533754880",
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

const calculatorLayout = ({ children }) => {
  return <>{children}</>;
};

export default calculatorLayout;
