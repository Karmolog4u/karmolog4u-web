import { web_site } from "@/helper/consts";

type ParamsProps = {
  params: Promise<{
    course_id: string;
    lesson_id: string;
  }>;
};

export const generateMetadata = async ({ params }: ParamsProps) => {
  const { course_id, lesson_id } = await params;

  return {
    title: 'Урок консультантського курсу',
    description: 'Урок консультантського курсу | Користувач',

    metadataBase: new URL(web_site),

    alternates: {
      canonical: `/cabinet/dashboard/course/consulting/${course_id}/lesson/${lesson_id}`,
      languages: {
        'uk-UA': `/uk/cabinet/dashboard/course/consulting/${course_id}/lesson/${lesson_id}`,
        'ru-RU': `/ru/cabinet/dashboard/user/course/consulting/${course_id}/lesson/${lesson_id}`,
      },
    },

    openGraph: {
      title: 'Урок консультантського курсу',
      description: 'Урок консультантського курсу | Користувач',
      url: `/cabinet/dashboard/course/consulting/${course_id}/lesson/${lesson_id}`,
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
      title: 'Урок консультантського курсу',
      description: 'Урок консультантського курсу | Користувач',
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
