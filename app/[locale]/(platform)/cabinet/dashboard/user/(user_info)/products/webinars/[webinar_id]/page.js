import { base_url } from '@/helper/consts';
import { getServerSession } from 'next-auth';
import DetailedProduct from '@/components/Cabinet/DashBoard/User/UserInfo/Products/DetailedProduct/DetailedProduct';
import { authOptions } from '@/lib/authOptions.js';
import { notFound } from 'next/navigation';

export const revalidate = 0;

const fetchProduct = async (id, token) => {
  const res = await fetch(`${base_url}/product/get-details-product/${id}`, {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    cache: 'no-store',
  });
  if (!res.ok) {
    const errorMessage = await res.json();
    throw new Error(errorMessage.message || 'Помилка завантаження Продукту');
  }
  return res.json();
};

const WebinarDetailed = async ({ params }) => {
  try {
    const { webinar_id } = await params;
    const session = await getServerSession(authOptions);
    const accessToken = session?.accessToken;
    if (!accessToken) {
      console.error('Access token not found in session');
      return <div>Немає доступу</div>;
    }
    const product = await fetchProduct(webinar_id, accessToken);

    if (!product) notFound();

    return <DetailedProduct product={product} token={accessToken} />;
  } catch (err) {
    console.error('Помилка завантаження продукту:', err);
    return notFound();
  }
};

export default WebinarDetailed;
