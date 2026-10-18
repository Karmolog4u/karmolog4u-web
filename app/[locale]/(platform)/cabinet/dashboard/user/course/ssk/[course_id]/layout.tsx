import { web_site } from "@/helper/consts";

type ParamsProps = {
  params: Promise<{
    course_id: string;
  }>;
};

export const generateMetadata = async ({ params }: ParamsProps) => {
  const { course_id } = await params;

  return {
    title: 'Курс Сам Собі Кармолог',
    description: 'Курс Сам Собі Кармолог | Користувач',

    metadataBase: new URL(web_site),

    alternates: {
      canonical: `/cabinet/dashboard/course/ssk/${course_id}`,
      languages: {
        'uk-UA': `/uk/cabinet/dashboard/course/ssk/${course_id}`,
        'ru-RU': `/ru/cabinet/dashboard/user/course/ssk/${course_id}`,
      },
    },

    openGraph: {
      title: 'Курс Сам Собі Кармолог',
      description: 'Курс Сам Собі Кармолог | Користувач',
      url: `/cabinet/dashboard/course/ssk/${course_id}`,
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
      title: 'Курс Сам Собі Кармолог',
      description: 'Курс Сам Собі Кармолог | Користувач',
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
