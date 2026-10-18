import Hero from '@/components/Main/Hero/Hero';
import QuestionAnswer from '@/components/Common/QuestionAnswer/QuestionAnswer';
import About from '@/components/Main/About/About';
import AboutPeopleOnTheWay from '@/components/Main/AboutPeopleOnTheWay/AboutPeopleOnTheWay';
import CoAuThorship from '@/components/Main/CoAuThorship/CoAuThorship';
import Feedback from '@/components/Main/Feedback/Feedback';
import MyDream from '@/components/Main/MyDream/MyDream';
import PatentedMethods from '@/components/Main/PatendedMethods/PatendedMethods';
import { column1, column2 } from '@/components/Main/QuestionAnswer/QuestionAnswer';
import Research from '@/components/Main/Research/Research';
import StarCustomers from '@/components/Main/StarCustomers/StarCustomers';
import { getTranslations } from 'next-intl/server';

export async function generateMetadata({ params }) {
  const { locale } = await params;

  const t = await getTranslations({ locale, namespace: 'Metadata.Main' });
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
        follow: true,
        noimageindex: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
    twitter: {
      title: t('title'),
      description: t('description'),
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

export default function Home() {
  return (
    <main>
      <Hero />
      <About />
      <MyDream />
      <AboutPeopleOnTheWay />
      <Research />
      <PatentedMethods />
      <CoAuThorship />
      <StarCustomers />
      <QuestionAnswer column1={column1} column2={column2} main />
      <Feedback main />
    </main>
  );
}
