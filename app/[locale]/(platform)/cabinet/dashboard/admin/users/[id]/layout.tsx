import { web_site } from "@/helper/consts";

type ParamsProps = {
  params: Promise<{
    id: string;
  }>;
};

export async function generateMetadata({ params }: ParamsProps) {
  const { id } = await params;

  return {
    title: 'Деталі користувача',
    description: 'Деталі користувача | Адмін',

    metadataBase: new URL(web_site),

    alternates: {
      canonical: `/cabinet/dashboard/admin/users/${id}`,
      languages: {
        'uk-UA': '/uk/cabinet/dashboard/admin/users/${id}',
        'ru-RU': '/ru/cabinet/dashboard/admin/users/${id}',
      },
    },

    openGraph: {
      title: 'Деталі користувача',
      description: 'Деталі користувача | Адмін',
      url: '/cabinet/dashboard/admin/users/${id}',
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
      title: 'Деталі користувача',
      description: 'Деталі користувача | Адмін',
      images: ['/twitter-image.png'],
    },

    robots: {
      index: false,
      follow: false,
    },
  };
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
