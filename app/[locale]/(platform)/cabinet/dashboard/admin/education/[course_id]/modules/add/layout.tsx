import { web_site } from "@/helper/consts";

type ParamsProps = {
  params: Promise<{
    course_id: string;
  }>;
};

export const generateMetadata = async ({ params }: ParamsProps) => {
  const { course_id } = await params;

  return {
    title: 'Створити Модуль',
    description: 'Створити Модуль | Адмін',

    metadataBase: new URL(web_site),

    alternates: {
      canonical: `/cabinet/dashboard/admin/education/${course_id}/modules/add`,
      languages: {
        'uk-UA': `/uk/cabinet/dashboard/admin/education/${course_id}/modules/add`,
        'ru-RU': `/ru/cabinet/dashboard/admin/education/${course_id}/modules/add`,
      },
    },

    openGraph: {
      title: 'Створити Модуль',
      description: 'Створити Модуль | Адмін',
      url: `/cabinet/dashboard/admin/education/${course_id}/modules/add`,
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
      title: 'Створити Модуль',
      description: 'Створити Модуль | Адмін',
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
