import { useState } from 'react';
import { useSession } from 'next-auth/react';
import PhoneInput from 'react-phone-input-2';
import { useTranslations } from 'next-intl';
import { useForm, Controller, FormProvider } from 'react-hook-form';

import styles from './ModalBuyForm.module.scss';
import 'react-phone-input-2/lib/bootstrap.css';
import Title from '@/components/Common/Title/Title';
import Link from 'next/link';
import FormInput from './FormInput/FormInput';
import { base_url } from '../../../helper/consts';
import useSendDataToWayForPay from '../../../hooks/useSendDataToWayForPay';

const sendCustomerInfo = async (data, token) => {
  const res = await fetch(`${base_url}/payments/product/create`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  });

  if (!res.ok) {
    const errorData = await res.json();
    let message = 'Помилка при створенні замовлення';
    if (errorData?.message) {
      message = Array.isArray(errorData.message) ? errorData.message.join(', ') : errorData.message;
      throw new Error(message);
    }
  }
  return res.json();
};

const Form = ({ price, id }) => {
  const [license, setLicense] = useState(false);
  const t = useTranslations('Author_products.buy_product_modal');
  const { data: info } = useSession();

  const method = useForm({
    defaultValues: info?.user
      ? {
          name: `${info.user.name} ${info.user.lastName}`,
          email: info.user.email,
          phone: info.user.mobPhone,
        }
      : {},
  });

  const mutation = useSendDataToWayForPay(info?.accessToken ?? '');

  const {
    handleSubmit,
    control,
    formState: { errors },
  } = method;

  const onFormSubmit = data => {
    const { phone, ...rest } = data;

    mutation.mutate({ ...rest, itemId: id, phone: `+${phone}`, paymentType: 'FULL' });
  };

  return (
    <FormProvider {...method}>
      {' '}
      <form className={styles.form} onSubmit={handleSubmit(onFormSubmit)}>
        <Title variant="p" styled={styles.form_title}>
          {t('enter_your_info')}
        </Title>
        <FormInput name="name" labelName={t('name')} />
        <FormInput
          name="email"
          labelName={t('email.email')}
          inputConfig={{
            setValueAs: value => (typeof value === 'string' ? value.trim() : value),
            required: t('email.empty_error'),
            pattern: {
              value: /\S+@\S+\.\S+/,
              message: t('email.wrong_email_error'),
            },
          }}
        />
        <FormInput name="promocode" labelName="Промокод" />
        <div>
          <p>{t('phone.phone')}</p>
          <Controller
            name="phone"
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
                onChange={phone => field.onChange('+' + phone)}
                prefix="+"
                defaultMask="(...) ...-..-.."
                className={styles.phone}
                inputClass={styles.flagInput}
                buttonClass={styles.buttonClass}
                dropdownClass={styles.dropdownClass}
              />
            )}
          />
          {errors.phone && <p className={styles.error}>{errors.phone.message}</p>}
        </div>
        <div className={styles.checkbox_wrapper}>
          <input
            type="checkbox"
            id="license"
            checked={license}
            onChange={e => setLicense(e.target.checked)}
          />
          <label htmlFor="license">
            <svg viewBox="0,0,50,50">
              <path d="M5 30 L 20 45 L 45 5"></path>
            </svg>
          </label>
          <p className={styles.text}>
            {t('license.part1')}{' '}
            <Link href={'/policy'} target="_blank">
              {t('license.part2')}
            </Link>{' '}
            {t('license.part3')}{' '}
            <Link href={'/offer'} target="_blank">
              {t('license.part4')}
            </Link>
          </p>
        </div>
        <Title variant="p" styled={styles.form_price}>
          {t('price')}:<span>{price}</span>
        </Title>
        <button type="submit" className={styles.submit_btn} disabled={!license}>
          {t('button')}
        </button>
      </form>
    </FormProvider>
  );
};

export default Form;
