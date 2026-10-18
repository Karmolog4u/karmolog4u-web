import { web_site } from "@/helper/consts";

type ParamsProps = {
  params: Promise<{
    meditation_id: string;
  }>;
};

export const generateMetadata = async ({ params }: ParamsProps) => {
  const { meditation_id } = await params;
  return {
    title: 'Деталі гайду або книги',
    description: 'Деталі гайду або книги | Користувач',

    metadataBase: new URL(web_site),

    alternates: {
      canonical: `/cabinet/dashboard/user/products/guides-and-books/${meditation_id}`,
      languages: {
        'uk-UA': `/uk/cabinet/dashboard/user/products/guides-and-books/${meditation_id}`,
        'ru-RU': `/ru/cabinet/dashboard/user/products/guides-and-books/${meditation_id}`,
      },
    },

    openGraph: {
      title: 'Деталі гайду або книги',
      description: 'Деталі гайду або книги | Користувач',
      url: `/cabinet/dashboard/user/products/guides-and-books/${meditation_id}`,
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
      title: 'Деталі гайду або книги',
      description: 'Деталі гайду або книги | Користувач',
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
