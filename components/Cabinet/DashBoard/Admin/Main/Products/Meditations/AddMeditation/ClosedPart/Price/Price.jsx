import { useEffect, useState } from 'react';
import { useFormContext } from 'react-hook-form';
import styles from '../ClosedPart.module.scss';
import DiscountCalendar from './DiscountCalendar';
import { open_Sans } from '@/app/[locale]/layout';
import DeleteDiscountButton from './DeleteDiscountButton';

const normalizeDiscount = value => {
  const normalized = value.replace(',', '.').replace(/[^\d.]/g, '');
  const [rawInteger, ...rawDecimals] = normalized.split('.');
  const integer = rawInteger.replace(/^0+(?=\d)/, '');
  if (!integer && rawDecimals.length === 0) return '';

  const numericInteger = Number(integer || 0);
  if (numericInteger > 100) return '100';

  const decimals = rawDecimals.join('').slice(0, 2);
  if (numericInteger === 100 && Number(decimals) > 0) return '100';

  return `${integer}${rawDecimals.length ? `.${decimals}` : ''}`;
};

const Price = () => {
  const [showDiscount, setShowDiscount] = useState(false);

  const {
    register,
    setValue,
    watch,
    formState: { errors },
  } = useFormContext();
  const newPriceCalculator = () => {
    const newPrice = watch('price') - watch('price') * (watch('discount') / 100);
    return parseFloat(newPrice.toFixed(2));
  };

  useEffect(() => {
    if (!!watch('discount')) setShowDiscount(true);
  }, [watch]);

  return (
    <>
      <div className={`${styles.price_wrapper} ${showDiscount ? styles.price_with_discount : ''}`}>
        <label className={`${styles.label}`}>
          Вартість €
          <input
            type="number"
            min={0}
            {...register('price', {
              pattern: {
                value: /^[0-9]+$/,
                message: 'Введіть тільки цифри',
              },
            })}
            placeholder="Введіть вартість"
            className={`${styles.input}`}
          />
          {errors?.price && <p className={styles.error}>{errors.price.message}</p>}
        </label>
        {!showDiscount && (
          <button
            aria-label="додати знижку"
            onClick={() => setShowDiscount(true)}
            className={`${styles.discount_button} ${open_Sans.className}`}
          >
            <svg viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M7 5V0H5V5H0V7H5V12H7V7H12V5H7Z" fill="#2961E0" />
            </svg>
            Додати знижку
          </button>
        )}
        {showDiscount && (
          <label className={`${styles.label}`}>
            Знижка %
            <input
              type="text"
              inputMode="decimal"
              min="0"
              max="100"
              {...register('discount', {
                pattern: {
                  value: /^(?:100(?:\.0{1,2})?|\d{1,2}(?:\.\d{0,2})?)$/,
                  message: 'Введіть тільки цифри',
                },
              })}
              onChange={event => {
                const value = normalizeDiscount(event.target.value);
                event.target.value = value;
                setValue('discount', value, { shouldDirty: true, shouldValidate: true });
              }}
              className={`${styles.input}`}
            />
          </label>
        )}
      </div>
      {showDiscount && !!watch('price') && !!watch('discount') && (
        <div className={styles.discount_wrapper}>
          <p className={styles.new_price}>
            Нова ціна: <span>{newPriceCalculator()}€</span>
          </p>
          <DiscountCalendar />
          <DeleteDiscountButton />
        </div>
      )}
    </>
  );
};

export default Price;
