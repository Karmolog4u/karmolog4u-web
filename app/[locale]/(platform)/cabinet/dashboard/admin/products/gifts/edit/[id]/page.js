import { getServerSession } from 'next-auth';
import FormHead from '@/components/Cabinet/DashBoard/Admin/FormHead/FormHead';
import AddGift from '@/components/Cabinet/DashBoard/Admin/Main/Products/Gifts/AddGift/AddGift';
import { authOptions } from '@/lib/authOptions.js';
import { base_url } from '@/helper/consts';

import styles from './edit_gifts_page.module.scss';

export const revalidate = 0;

const editGift = async (id, token) => {
  const res = await fetch(`${base_url}/admin/products/gifts/get/${id}`, {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    cache: 'no-store',
  });
  if (!res.ok) {
    throw new Error('Failed to fetch guide or book');
  }
  return res.json();
};

const EditPage = async ({ params }) => {
  const { id } = await params;
  const { accessToken } = await getServerSession(authOptions);
  const gift = await editGift(id, accessToken);

  return (
    <div className={styles.wrapper}>
      <FormHead title={'Редагувати публікацію'} />
      <AddGift edit={gift} />
    </div>
  );
};

export default EditPage;
