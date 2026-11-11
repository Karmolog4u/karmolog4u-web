import FormHead from '@/components/Cabinet/DashBoard/Admin/FormHead/FormHead';
import styles from './edit_meditation_page.module.scss';
import MeditationForm from '@/components/Cabinet/DashBoard/Admin/Main/Products/Meditations/AddMeditation/AddMeditation';
import { authOptions } from '@/lib/authOptions.js';
import { base_url } from '@/helper/consts';
import { getServerSession } from 'next-auth';

export const revalidate = 0;

const editMeditation = async (id, token) => {
  const res = await fetch(`${base_url}/admin/products/meditations/get/${id}`, {
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
  const meditation = await editMeditation(id, accessToken);

  return (
    <div className={styles.wrapper}>
      <FormHead title={'Редагувати публікацію'} />
      <MeditationForm edit={meditation} />
    </div>
  );
};

export default EditPage;
