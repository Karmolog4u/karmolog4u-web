'use client';

import { useRouter } from 'next/navigation';
import { FormProvider, useForm } from 'react-hook-form';
import { useMutation } from '@tanstack/react-query';
import { useSession } from 'next-auth/react';
import { toast, ToastContainer } from 'react-toastify';
import RequiredLabels from '../../Meditations/AddMeditation/RequiredLabels/RequiredLabels';
import SubmitButtons from '../../Meditations/AddMeditation/SubmitButtons/SubmitButtons';
import ImageInput from '../../Meditations/AddMeditation/ClosedPart/ImageInput';
import Price from '../../Meditations/AddMeditation/ClosedPart/Price/Price';
import Description from '../../Meditations/AddMeditation/ClosedPart/Description';
import { base_url } from '@/helper/consts';

import styles from './AddGift.module.scss';
import 'react-toastify/dist/ReactToastify.css';

async function AddOrUpdateGift({ data, token, action, id }) {
  const url =
    action === 'add'
      ? `${base_url}/admin/products/gifts/create`
      : `${base_url}/admin/products/gifts/edit/${id}`;
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
  if (!item) return { cover: '' };
  const { name, description, price = '', discount = null, cover = null } = item;

  return {
    name_uk: name.uk,
    name_ru: name.ru,
    description_uk: description.uk,
    description_ru: description.ru,
    price: price,
    discount: discount?.discount,
    start_date: discount ? new Date(discount.start) : undefined,
    end_date: discount ? new Date(discount.expiredAt) : undefined,
    ...(cover ? { cover } : { cover: '' }),
  };
};

const AddGift = ({ edit }) => {
  const router = useRouter();
  const methods = useForm({ defaultValues: setDefaultValues(edit) });
  const { data: token } = useSession();
  const { handleSubmit, setValue } = methods;

  const mutation = useMutation({
    mutationFn: ({ info }) =>
      AddOrUpdateGift({
        data: info,
        token: token.accessToken,
        action: edit ? 'edit' : 'add',
        id: edit ? edit._id : '',
      }),
    onSuccess: () => {
      toast.success('Запис успішно додано!', { autoClose: 1000 });
      router.refresh();
      setTimeout(() => router.push('/cabinet/dashboard/admin/products/gifts'), 1500);
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
    const { name_uk, name_ru, status, cover, description_uk, description_ru, discount, price } =
      data;

    const formData = new FormData();

    const requiredParams = {
      name: { uk: name_uk, ru: name_ru },
      status,
      price,
      description: {
        uk: description_uk,
        ru: description_ru,
      },
    };

    Object.entries(requiredParams).forEach(([key, value]) =>
      formData.append(key, JSON.stringify(value))
    );

    if (cover) {
      formData.append('cover', cover);
    }

    if (discount) {
      formData.append(
        'discount',
        JSON.stringify({ discount, start: data.start_date, expiredAt: data.end_date })
      );
    }

    mutation.mutate({ info: formData });
  };
  return (
    <FormProvider {...methods}>
      <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
        <div className={styles.labels_wrapper}>
          <RequiredLabels />
          <ImageInput />
          <Price />
          <Description />
        </div>
        <SubmitButtons setStatusAndSubmit={setStatusAndSubmit} />
      </form>
      <ToastContainer />
    </FormProvider>
  );
};

export default AddGift;
