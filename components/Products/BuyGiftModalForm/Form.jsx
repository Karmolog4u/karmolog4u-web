'use client';
import { useState } from 'react';
import { useSession } from 'next-auth/react';
import PhoneInput from 'react-phone-input-2';
import { useForm, Controller, FormProvider } from 'react-hook-form';
import { useLocale, useTranslations } from 'next-intl';
import AsyncSelect from 'react-select/async';
import Select from 'react-select';
import Link from 'next/link';
import useSendDataToWayForPay from '../../../hooks/useSendDataToWayForPay';

import Title from '@/components/Common/Title/Title';
import FormInput from '../ModalBuyForm/FormInput/FormInput';
import { getPriceWithDiscount } from '../../../helper/products/getDiscount';

import styles from './BuyGiftModalForm.module.scss';
import 'react-phone-input-2/lib/bootstrap.css';

const Form = ({ price, discount, id }) => {
  const [license, setLicense] = useState(false);
  const [warehousesList, setWarehousesList] = useState([]);
  const [cityValue, setCityValue] = useState('');
  const { data: info } = useSession();

  const t = useTranslations('Author_products.buy_gift_modal');
  const locale = useLocale();

  const methods = useForm({
    defaultValues: info?.user
      ? {
          name: `${info.user.name} ${info.user.lastName}`,
          email: info.user.email,
          phone: info.user.mobPhone,
        }
      : {},
  });

  const {
    handleSubmit,
    setValue,
    control,
    formState: { errors },
  } = methods;

  const mutation = useSendDataToWayForPay(info?.accessToken ?? '', true);

  const onFormSubmit = data => {
    const { warehouse, city, ...rest } = data;

    mutation.mutate({
      ...rest,
      itemId: id,
      paymentType: 'FULL',
      warehouse: warehouse.label,
      city: city.label,
    });
  };

  const loadOptions = async (value, callback) => {
    if (value.length < 3) return;
    const data = await fetch(`/api/nova-poshta/cities?city=${value}`);
    const options = await data.json();
    return options.data;
  };

  const cityStyling = {
    control: () => `${styles.control}`,
    indicatorSeparator: () => styles.indicatorSeparator,
    menu: () => styles.menu,
    option: ({ isSelected, isFocused }) =>
      isSelected || isFocused ? styles.option_selected : styles.option,
    input: () => styles.singleValue,
    singleValue: () => styles.singleValue,
  };

  const onCityChange = async selectedCity => {
    if (!selectedCity) return;
    const data = await fetch(
      `/api/nova-poshta/warehouses?warehouse=${selectedCity.value}&ln=${locale}`
    );
    const wh = await data.json();
    setWarehousesList(wh.data);
    setValue('city', selectedCity);
    setCityValue(selectedCity.value);
  };

  return (
    <FormProvider {...methods}>
      {' '}
      <form className={styles.form} onSubmit={handleSubmit(onFormSubmit)}>
        <Title variant="p" styled={styles.form_title}>
          {t('enter_your_info')}:
        </Title>
        <FormInput name="name" labelName={t('name')} />
        <FormInput
          name="email"
          labelName={t('email.email')}
          inputConfig={{
            required: t('email.empty_error'),
            pattern: {
              value: /\S+@\S+\.\S+/,
              message: t('email.wrong_email_error'),
            },
          }}
        />
        <FormInput name="promocode" labelName="Промокод" />
        <div>
          <p>{t('city.city')}</p>
          <Controller
            name="city"
            control={control}
            rules={{
              required: { value: true, message: t('city.choose_city') },
            }}
            render={({ field }) => (
              <AsyncSelect
                {...field}
                loadOptions={loadOptions}
                defaultOptions
                onChange={val => {
                  field.onChange(val);
                  onCityChange(val);
                }}
                noOptionsMessage={() => {
                  return t('city.enter_three_letters');
                }}
                classNames={cityStyling}
                placeholder={t('city.placeholder')}
              />
            )}
          />
        </div>
        {cityValue && warehousesList.length !== 0 && (
          <div>
            <p>{t('warehouse.warehouse')}</p>
            <Controller
              name="warehouse"
              control={control}
              rules={{
                required: { value: true, message: t('warehouse.choose_wh') },
              }}
              render={({ field }) => (
                <Select
                  {...field}
                  options={warehousesList}
                  onChange={val => field.onChange(val)}
                  noOptionsMessage={() => {
                    return t('warehouse.not_found');
                  }}
                  classNames={cityStyling}
                  placeholder={t('warehouse.placeholder')}
                />
              )}
            />
          </div>
        )}
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
                onChange={phone => field.onChange(phone)}
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
        <div className={styles.form_price_wrapper}>
          <Title variant="p" styled={`${styles.form_price}`}>
            {t('price')}:<span className={`${discount ? styles.discount : ''}`}>{price}€</span>
          </Title>
          {discount && (
            <Title variant="p" styled={`${styles.form_price}`}>
              {getPriceWithDiscount({ discount, price })}€
            </Title>
          )}
        </div>
        <button type="submit" className={styles.submit_btn} disabled={!license}>
          {t('button')}
        </button>
      </form>
    </FormProvider>
  );
};

export default Form;
