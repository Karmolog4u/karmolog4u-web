import { web_site } from "@/helper/consts";

type ParamsProps = {
  params: Promise<{
    meditation_id: string;
  }>;
};

export const generateMetadata = async ({ params }: ParamsProps) => {
  const { meditation_id } = await params;
  return {
    title: 'Деталі вебінару',
    description: 'Деталі вебінару | Користувач',

    metadataBase: new URL(web_site),

    alternates: {
      canonical: `/cabinet/dashboard/user/products/webinars/${meditation_id}`,
      languages: {
        'uk-UA': `/uk/cabinet/dashboard/user/products/webinars/${meditation_id}`,
        'ru-RU': `/ru/cabinet/dashboard/user/products/webinars/${meditation_id}`,
      },
    },

    openGraph: {
      title: 'Деталі вебінару',
      description: 'Деталі вебінару | Користувач',
      url: `/cabinet/dashboard/user/products/webinars/${meditation_id}`,
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
      title: 'Деталі вебінару',
      description: 'Деталі вебінару | Користувач',
      images: ['/twitter-image.png'],
    },

    robots: {
      index: false,
      follow: false,
    },
  };
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
