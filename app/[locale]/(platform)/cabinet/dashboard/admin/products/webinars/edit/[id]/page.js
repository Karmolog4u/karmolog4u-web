import FormHead from '@/components/Cabinet/DashBoard/Admin/FormHead/FormHead';
import AddWebinar from '@/components/Cabinet/DashBoard/Admin/Main/Products/Webinars/AddWebinar/AddWebinar';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/authOptions.js';
import styles from './edit_meditation_page.module.scss';
import { base_url } from '@/helper/consts';

export const revalidate = 0;

const editWebinar = async (id, token) => {
  const res = await fetch(`${base_url}/admin/products/webinars/get/${id}`, {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    cache: 'no-store',
  });

  if (!res.ok) {
    throw new Error('Failed to fetch meditations');
  }
  return res.json();
};

const EditPage = async ({ params }) => {
  const { id } = await params;
  const { accessToken } = await getServerSession(authOptions);
  const webinar = await editWebinar(id, accessToken);

  return (
    <div className={styles.wrapper}>
      <FormHead title={'Редагувати публікацію'} />
      <AddWebinar edit={webinar} />
    </div>
  );
};

export default EditPage;
