import { web_site } from "@/helper/consts";

type ParamsProps = {
  params: Promise<{
    course_id: string;
  }>;
};

export const generateMetadata = async ({ params }: ParamsProps) => {
  const { course_id } = await params;

  return {
    title: 'Матеріали до курсу',
    description: 'Матеріали до курсу | Користувач',

    metadataBase: new URL(web_site),

    alternates: {
      canonical: `/cabinet/dashboard/course/ssk/${course_id}/literature`,
      languages: {
        'uk-UA': `/uk/cabinet/dashboard/course/ssk/${course_id}/literature`,
        'ru-RU': `/ru/cabinet/dashboard/user/course/ssk/${course_id}/literature`,
      },
    },

    openGraph: {
      title: 'Матеріали до курсу',
      description: 'Матеріали до курсу | Користувач',
      url: `/cabinet/dashboard/course/ssk/${course_id}/literature`,
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
      title: 'Матеріали до курсу',
      description: 'Матеріали до курсу | Користувач',
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
