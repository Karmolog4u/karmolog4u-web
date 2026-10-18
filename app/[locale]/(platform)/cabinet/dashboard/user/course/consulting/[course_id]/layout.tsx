import { web_site } from "@/helper/consts";

type ParamsProps = {
  params: Promise<{
    course_id: string;
  }>;
};

export const generateMetadata = async ({ params }: ParamsProps) => {
  const { course_id } = await params;

  return {
    title: 'Консультантський курс',
    description: 'Консультантський курс | Користувач',

    metadataBase: new URL(web_site),

    alternates: {
      canonical: `/cabinet/dashboard/course/consulting/${course_id}`,
      languages: {
        'uk-UA': `/uk/cabinet/dashboard/course/consulting/${course_id}`,
        'ru-RU': `/ru/cabinet/dashboard/user/course/consulting/${course_id}`,
      },
    },

    openGraph: {
      title: 'Консультантський курс',
      description: 'Консультантський курс | Користувач',
      url: `/cabinet/dashboard/course/consulting/${course_id}`,
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
      title: 'Консультантський курс',
      description: 'Консультантський курс | Користувач',
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
