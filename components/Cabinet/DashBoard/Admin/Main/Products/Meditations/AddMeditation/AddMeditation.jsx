'use client';

import { useRouter } from 'next/navigation';
import { useMutation } from '@tanstack/react-query';
import { useForm, FormProvider } from 'react-hook-form';
import { useSession } from 'next-auth/react';
import { toast, ToastContainer } from 'react-toastify';
import ArcanesPart from './ArcanesPart/ArcanesPart';
import ClosedPart from './ClosedPart/ClosedPart';
import OpenedPart from './OpenedPart/OpenedPart';
import RequiredLabels from './RequiredLabels/RequiredLabels';
import SubmitButtons from './SubmitButtons/SubmitButtons';

import {
  ARCANES,
  base_url,
  CLOSED_MEDITATIONS,
  OPENED_MEDITATIONS,
  PUBLISHED,
} from '@/helper/consts';

import styles from './AddMeditationForm.module.scss';
import 'react-toastify/dist/ReactToastify.css';
import { getYoutubeUrlData } from '../../../../../../../../helper/platform/getYoutubeId';

async function addMeditation({ data, token, action, id }) {
  const url =
    action === 'add'
      ? `${base_url}/admin/products/meditations/create`
      : `${base_url}/admin/products/meditations/edit/${id}`;
  const res = await fetch(url, {
    method: action === 'add' ? 'POST' : 'PUT',
    headers: {
      Authorization: `Bearer ${token}`,
    },
    body: data,
  });

  if (!res.ok) {
    const errorMessage = await res.json();
    throw new Error(errorMessage.message || 'Не вдалося надіслати дані');
  }

  return res.json();
}

const setDefaultValues = item => {
  if (!item) return {};
  const {
    name,
    category,
    video,
    isWaiting,
    description,
    price = '',
    discount = null,
    cover = null,
  } = item;

  const videoUrl =
    typeof video === 'string'
      ? video
        ? `https://youtube.com/watch?v=${video}`
        : ''
      : video?.video
        ? `https://youtube.com/watch?v=${video.video}${video.playlist ? `&list=${video.playlist}` : ''}`
        : video?.playlist
          ? `https://youtube.com/playlist?list=${video.playlist}`
          : '';

  return {
    name_uk: name.uk,
    name_ru: name.ru,
    category: category,
    video: videoUrl,
    isWaiting: isWaiting,
    description_uk: description.uk,
    description_ru: description.ru,
    price: price,
    discount: discount?.discount,
    start_date: discount ? new Date(discount.start) : undefined,
    end_date: discount ? new Date(discount.expiredAt) : undefined,
    ...(cover ? { cover } : { cover: '' }),
  };
};

const categoriesList = [
  { value: ARCANES, name: 'Медитації по 22 енергіях' },
  { value: CLOSED_MEDITATIONS, name: 'Медитації у закритому доступі' },
  { value: OPENED_MEDITATIONS, name: 'Медитації у відкритому доступі' },
];

const MeditationForm = ({ edit }) => {
  const router = useRouter();
  const methods = useForm({ defaultValues: setDefaultValues(edit) });
  const { data: token } = useSession();

  const { handleSubmit, getValues, setValue, watch, setError } = methods;
  const mutation = useMutation({
    mutationFn: ({ info }) =>
      addMeditation({
        data: info,
        token: token.accessToken,
        action: edit ? 'edit' : 'add',
        id: edit ? edit._id : '',
      }),
    onSuccess: () => {
      toast.success('Медитацію успішно додано!', { autoClose: 2500 });
      router.refresh();
      setTimeout(() => router.push('/cabinet/dashboard/admin/products/meditations'), 3000);
    },
    onError: err => {
      toast.error(`Помилка: ${err.message}`);
    },
  });

  const setStatusAndSubmit = status => {
    setValue('status', status);
    handleSubmit(onSubmit)();
  };

  const onSubmit = data => {
    const { name_uk, name_ru, status, category, cover, description_uk, description_ru, video } =
      data;
    if (!getValues('category')) {
      setError('category', { type: 'manual', message: 'Оберіть категорію' });
    }
    //дістаємо дані з посилання на YouTube
    const youtubeData = getYoutubeUrlData(video);

    if (!youtubeData.video && !youtubeData.playlist && status === PUBLISHED) {
      setError('video', {
        type: 'manual',
        message: 'Введіть посилання з YouTube',
      });
      return;
    }

    const formData = new FormData();
    const requiredParams = {
      name: { uk: name_uk, ru: name_ru },
      category,
      status,
      video: youtubeData,
    };
    //додаємо ключи які точно є
    Object.entries(requiredParams).forEach(([key, value]) =>
      formData.append(key, JSON.stringify(value))
    );
    //додаємо обкладинку якщо існує
    const coverFile =
      typeof File !== 'undefined' && cover instanceof File
        ? cover
        : typeof FileList !== 'undefined' && cover instanceof FileList
          ? cover.item(0)
          : null;
    if (coverFile) {
      formData.append('cover', coverFile);
    }
    //додаємо опис якщо існує
    if (description_ru && description_uk) {
      formData.append('description', JSON.stringify({ uk: description_uk, ru: description_ru }));
    }
    if (data.category === ARCANES) {
      const { isWaiting } = data;
      formData.append('isWaiting', isWaiting);
    }
    if (data.category === CLOSED_MEDITATIONS && status === PUBLISHED) {
      const { price, discount = null } = data;
      formData.append('price', price);
      if (discount) {
        formData.append(
          'discount',
          JSON.stringify({ discount, start: data.start_date, expiredAt: data.end_date })
        );
      }
    }
    mutation.mutate({ info: formData });
  };

  return (
    <FormProvider {...methods}>
      <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
        <div className={styles.labels_wrapper}>
          <RequiredLabels categories={categoriesList} />
          {watch('category') === ARCANES && <ArcanesPart />}
          {watch('category') === CLOSED_MEDITATIONS && <ClosedPart />}
          {watch('category') === OPENED_MEDITATIONS && <OpenedPart />}
        </div>
        <SubmitButtons setStatusAndSubmit={setStatusAndSubmit} />
      </form>
      <ToastContainer />
    </FormProvider>
  );
};

export default MeditationForm;
