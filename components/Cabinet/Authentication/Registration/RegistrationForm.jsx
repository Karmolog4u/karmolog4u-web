'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useMutation } from '@tanstack/react-query';
import Link from 'next/link';
import { useForm, Controller } from 'react-hook-form';
import { useTranslations } from 'next-intl';
import { toast } from 'react-toastify';
import PhoneInput from 'react-phone-input-2';

import FormHeader from '../FormHeader/FormHeader';
import ShowPasswordIcon from '../Login/ShowPasswordIcon';

import styles from './RegistrationForm.module.scss';
import 'react-phone-input-2/lib/bootstrap.css';
import { base_url } from '@/helper/consts';

const registerUser = async data => {
  const response = await fetch(`${base_url}/auth/register`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ ...data }),
  });
  const parsedData = await response.json();

  if (!response.ok) {
    const message = Array.isArray(parsedData.message)
      ? parsedData.message[0]
      : parsedData.message || 'Помилка реєстрації';
    throw new Error(message);
  }
  return parsedData;
};

const RegistrationForm = () => {
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();
  const t = useTranslations('Author_products.buy_gift_modal');

  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
    clearErrors,
  } = useForm();

  const mutation = useMutation({
    mutationFn: data => registerUser(data),
    onSuccess: () => {
      toast.success('Успішно');
      setTimeout(() => router.push('/cabinet/login'), 1000);
    },
  });

  const onFormSubmit = async data => {
    mutation.mutate(data);
  };

  return (
    <div className={styles.wrapper}>
      <form className={styles.form} onSubmit={handleSubmit(onFormSubmit)}>
        <FormHeader title={'Реєстрація'} />
        <div className={styles.labels_wrapper}>
          <div className={`${styles.labels_wrapper} ${styles.customer_name_wrapper}`}>
            {/* name */}
            <label className={styles.label}>
              <p className={styles.label_text}>Ім’я</p>
              <input
                className={`${styles.input} ${errors?.name ? styles.error : ''}`}
                placeholder="Ваше ім’я"
                type="text"
                {...register('name', { required: t('email.empty_error') })}
              />
            </label>
            {/* lastname */}
            <label className={styles.label}>
              <p className={styles.label_text}>Прізвище</p>
              <input
                className={`${styles.input} ${errors?.lastName ? styles.error : ''}`}
                placeholder="Ваше прізвище"
                type="text"
                {...register('lastName', { required: t('email.empty_error') })}
              />
            </label>
          </div>
          {/* email */}
          <label className={styles.label}>
            <p className={styles.label_text}>Email</p>
            <input
              className={`${styles.input} ${errors?.email ? styles.error : ''}`}
              placeholder="Введіть ваш email"
              type="text"
              {...register('email', {
                required: t('email.empty_error'),
                pattern: {
                  value: /\S+@\S+\.\S+/,
                  message: t('email.wrong_email_error'),
                },
              })}
            />
          </label>
          {/* phone */}
          <label className={styles.label}>
            <p className={styles.label_text}>Номер телефону</p>
            <Controller
              name="mobPhone"
              control={control}
              rules={{
                minLength: {
                  value: 12,
                  message: t('phone.min_length_error'),
                },
                required: { value: true, message: t('phone.empty_number_error') },
              }}
              render={({ field }) => (
                <PhoneInput
                  country={'ua'}
                  value={field.value}
                  placeholder="+38(099) 999-99-99"
                  onChange={value => {
                    field.onChange(`+${value}`); // додаємо + вручну
                  }}
                  defaultMask="(..) ...-..-.."
                  className={styles.phone}
                  inputClass={`${styles.flagInput} ${errors.mobPhone ? styles.error : ''}`}
                  buttonClass={styles.buttonClass}
                  dropdownClass={styles.dropdownClass}
                  countryCodeEditable={false}
                />
              )}
            />
          </label>
          {/* password */}
          <label className={styles.label}>
            <p className={styles.label_text}>Пароль</p>
            <input
              className={`${styles.input} ${errors.password ? styles.error : ''}`}
              placeholder="Введіть ваш пароль"
              type={showPassword ? 'text' : 'password'}
              {...register('password', {
                required: t('email.empty_error'),
                minLength: { value: 8, message: 'мінімум 8 символів' },
                onChange: () => clearErrors('password'),
              })}
            />

            <ShowPasswordIcon showPassword={showPassword} setShowPassword={setShowPassword} />
          </label>
        </div>
        <button type="submit" className={styles.button} disabled={mutation.isPending}>
          Створити акаунт
        </button>

        <p className={styles.link_to_login}>
          Вже маєте акаунт? <Link href={'/cabinet/login'}>Увійти в акаунт</Link>
        </p>
      </form>
    </div>
  );
};

export default RegistrationForm;
