import { web_site } from "@/helper/consts";

export async function generateMetadata() {
  return {
    metadataBase: new URL(web_site),
    title: 'Повторно відправити верифікацію',
    description: 'Повторно відправити верифікацію',

    alternates: {
      canonical: '/',
      languages: {
        'uk-UA': `/uk`,
        'ru-Ru': '/ru',
      },
    },
    openGraph: {
      title: 'Повторно відправити верифікацію',
      description: 'Повторно відправити верифікацію',
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
      title: 'Повторно відправити верифікацію',
      description: 'Повторно відправити верифікацію',

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

const layout = ({ children }: { children: React.ReactNode }) => {
  return <>{children}</>;
};

export default layout;
