'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useForm } from 'react-hook-form';
import { useTranslations } from 'next-intl';
import { signIn } from 'next-auth/react';

import styles from './LoginForm.module.scss';
import ShowPasswordIcon from './ShowPasswordIcon';
import FormHeader from '../FormHeader/FormHeader';

const LoginForm = () => {
  const [showPassword, setShowPassword] = useState(false);
  const t = useTranslations('Author_products.buy_gift_modal');

  const { register, handleSubmit } = useForm();

  const onFormSubmit = async data => {
    const { email, password } = data;
    const res = await signIn('credentials', { email, password });

    if (res?.error) {
      console.log('error');
    }
  };

  return (
    <div className={styles.wrapper}>
      <form className={styles.form} onSubmit={handleSubmit(onFormSubmit)}>
        <FormHeader title={'Вхід'} />
        <div className={styles.labels_wrapper}>
          <label className={styles.label}>
            <p className={styles.label_text}>Email</p>
            <input
              className={styles.input}
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
          <label className={styles.label}>
            <p className={styles.label_text}>Пароль</p>
            <input
              className={styles.input}
              placeholder="Введіть ваш пароль"
              type={showPassword ? 'text' : 'password'}
              {...register('password', {
                required: t('email.empty_error'),
                minLength: { value: 8, message: 'мінімум 8 символів' },
              })}
            />
            <ShowPasswordIcon showPassword={showPassword} setShowPassword={setShowPassword} />
          </label>
        </div>
        <Link href={'/cabinet/reset-password'} className={`${styles.forgot_password}`}>
          Забули пароль?
        </Link>
        <button type="submit" className={styles.button}>
          Увійти
        </button>

        <p className={styles.link_to_registration}>
          Немає акаунту? <Link href={'/cabinet/registration'}>Зареєструватись</Link>
        </p>
        <p className={styles.link_to_registration}>
          Уже створений, але не <Link href={'/cabinet/resent-verification'}>Верифікований?</Link>
        </p>
      </form>
    </div>
  );
};

export default LoginForm;
