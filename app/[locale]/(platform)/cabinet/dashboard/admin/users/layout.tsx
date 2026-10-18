import { web_site } from '@/helper/consts';
import type { Metadata } from 'next';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const metadata: Metadata = {
  title: 'Користувачі',
  description: 'Список користувачів | Адмін',

  metadataBase: new URL(web_site),

  alternates: {
    canonical: '/cabinet/dashboard/admin/users',
    languages: {
      'uk-UA': '/uk/cabinet/dashboard/admin/users',
      'ru-RU': '/ru/cabinet/dashboard/admin/users',
    },
  },

  openGraph: {
    title: 'Користувачі',
    description: 'Список користувачів | Адмін',
    url: '/cabinet/dashboard/admin/users',
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
    title: 'Користувачі',
    description: 'Список користувачів | Адмін',
    images: ['/twitter-image.png'],
  },

  robots: {
    index: false,
    follow: false,
  },
};

const UsersLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      {children}
      <ToastContainer autoClose={2000} closeOnClick />
    </>
  );
};

export default UsersLayout;
