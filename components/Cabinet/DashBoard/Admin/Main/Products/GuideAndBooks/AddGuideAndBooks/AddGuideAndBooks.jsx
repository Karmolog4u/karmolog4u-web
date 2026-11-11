'use client';

import { useMutation } from '@tanstack/react-query';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { FormProvider, useForm } from 'react-hook-form';
import { toast, ToastContainer } from 'react-toastify';
import SubmitButtons from '../../Meditations/AddMeditation/SubmitButtons/SubmitButtons';
import RequiredLabels from '../../Meditations/AddMeditation/RequiredLabels/RequiredLabels';
import OtherGuidesPart from './OtherGuidesPart/OtherGuidesPart';
import BooksPart from './BooksPart/BooksPart';
import GuidesPart from './GuidesPart/GuidesPart';
import Description from '../../Meditations/AddMeditation/ClosedPart/Description';
import { base_url, BOOKS, GUIDES, OTHER_GUIDES, PUBLISHED } from '@/helper/consts';

import styles from './AddGuideAndBooks.module.scss';
import 'react-toastify/dist/ReactToastify.css';
import { getYoutubeUrlData } from '../../../../../../../../helper/platform/getYoutubeId';

async function guideAndBooksAction({ data, token, action, id }) {
  const url =
    action === 'add'
      ? `${base_url}/admin/products/guides-and-books/create`
      : `${base_url}/admin/products/guides-and-books/edit/${id}`;
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
    link,
    file,
    description,
    price = '',
    discount = null,
    cover = null,
  } = item;
  const videoId = typeof video === 'object' ? video?.video : video;
  const playlistId = typeof video === 'object' ? video?.playlist : '';
  const youtubeUrl = videoId
    ? `https://youtube.com/watch?v=${videoId}${playlistId ? `&list=${playlistId}` : ''}`
    : playlistId
      ? `https://youtube.com/playlist?list=${playlistId}`
      : link || '';

  return {
    name_uk: name.uk,
    name_ru: name.ru,
    category: category,
    file: file ?? null,
    video: youtubeUrl,
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
  { value: GUIDES, name: 'Гайди по 22 енергіям' },
  { value: OTHER_GUIDES, name: 'Інші гайди' },
  { value: BOOKS, name: 'Друковані видання' },
];

const AddGuideAndBooks = ({ edit }) => {
  const router = useRouter();
  const methods = useForm({ defaultValues: setDefaultValues(edit) });
  const { data: token } = useSession();
  const { handleSubmit, getValues, setValue, watch, setError } = methods;

  const mutation = useMutation({
    mutationFn: ({ info }) =>
      guideAndBooksAction({
        data: info,
        token: token.accessToken,
        action: edit ? 'edit' : 'add',
        id: edit ? edit._id : '',
      }),
    onSuccess: () => {
      toast.success('Запис успішно додано!', { autoClose: 2000 });
      router.refresh();
      setTimeout(() => router.push('/cabinet/dashboard/admin/products/guides-and-books'), 2500);
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
    const {
      name_uk,
      name_ru,
      status,
      category,
      cover,
      description_uk,
      description_ru,
      video,
      discount,
      price,
      file,
    } = data;
    if (!getValues('category')) {
      setError('category', { type: 'manual', message: 'Оберіть категорію' });
    }

    const videoUrl = typeof video === 'string' ? video.trim() : '';
    const youtubeData = getYoutubeUrlData(videoUrl);
    let externalLink = '';

    // Відео необов'язкове. Якщо посилання не розпізналося як YouTube,
    // передаємо його окремо як link, але лише коли це HTTP(S) URL.
    if (videoUrl && !youtubeData.video && !youtubeData.playlist) {
      try {
        const parsedUrl = new URL(videoUrl);
        if (parsedUrl.protocol === 'http:' || parsedUrl.protocol === 'https:') {
          externalLink = videoUrl;
        } else {
          throw new Error('Invalid link');
        }
      } catch {
        setError('video', {
          type: 'manual',
          message: 'Введіть коректне посилання',
        });
        return;
      }
    }

    const selectedFile =
      typeof FileList !== 'undefined' && file instanceof FileList ? file.item(0) : file;

    if (!selectedFile && category !== OTHER_GUIDES && status === PUBLISHED) {
      setError('file', { type: 'manual', message: 'Додайте файл' });
      return;
    }

    const formData = new FormData();

    formData.append(
      'video',
      JSON.stringify({ video: youtubeData.video || '', playlist: youtubeData.playlist || '' })
    );
    if (externalLink) formData.append('link', externalLink);

    const requiredParams = {
      name: { uk: name_uk, ru: name_ru },
      category,
      status,
      file: selectedFile ?? '',
    };

    Object.entries(requiredParams).forEach(([key, value]) =>
      formData.append(key, JSON.stringify(value))
    );

    //перевірка чи існує cover і якщо да то перевіряємо чи файл
    if (cover) {
      formData.append('cover', cover);
    }

    formData.append('price', price);
    if (discount) {
      formData.append(
        'discount',
        JSON.stringify({ discount, start: data.start_date, expiredAt: data.end_date })
      );
    }

    if (category === OTHER_GUIDES || category === BOOKS) {
      if (description_ru && description_uk) {
        formData.append('description', JSON.stringify({ uk: description_uk, ru: description_ru }));
      }
    }

    mutation.mutate({ info: formData });
  };

  return (
    <FormProvider {...methods}>
      {' '}
      <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
        <div className={styles.labels_wrapper}>
          <RequiredLabels categories={categoriesList} />
          {watch('category') === OTHER_GUIDES && (
            <OtherGuidesPart serverFile={edit?.file?.originalName || null} />
          )}
          {watch('category') === BOOKS && <BooksPart serverFile={edit?.file?.originalName} />}
          {watch('category') === GUIDES && <GuidesPart serverFile={edit?.file?.originalName} />}
          <Description />
        </div>
        <SubmitButtons setStatusAndSubmit={setStatusAndSubmit} />
      </form>
      <ToastContainer />
    </FormProvider>
  );
};

export default AddGuideAndBooks;
