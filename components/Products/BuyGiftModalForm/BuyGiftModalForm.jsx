'use client';
import { useState } from 'react';
import Image from 'next/image';
import { useLocale, useTranslations } from 'next-intl';
import Title from '@/components/Common/Title/Title';
import Form from './Form';
import Logo from '@/components/Common/Icons/Logo';

import styles from './BuyGiftModalForm.module.scss';

export const dynamic = 'force-dynamic';

const BuyGiftModalForm = ({ gift }) => {
  const [failedCover, setFailedCover] = useState(null);

  const t = useTranslations('Author_products.buy_gift_modal');
  const locale = useLocale();

  const { cover, name, price, discount } = gift;
  const imageSrc = typeof cover === 'string' && cover.trim() ? cover.trim() : null;
  const showFallback = !imageSrc || failedCover === imageSrc;

  return (
    <div className={styles.modal_container}>
      <Title styled={styles.title}>{t('title')}:</Title>
      <div className={styles.order_wrapper}>
        {showFallback ? (
          <div className={styles.img_error}>
            <Logo styled={styles.img_error_logo} />
          </div>
        ) : (
          <Image
            src={imageSrc}
            alt="замовлення"
            width={91}
            height={72}
            unoptimized
            onError={() => setFailedCover(imageSrc)}
          />
        )}

        <p className={styles.product_name}>{name[locale]}</p>
        {price && (
          <Title styled={styles.price} variant="p">
            {price}€
          </Title>
        )}
      </div>
      <p className={styles.warning}>
        {t('notification.part1')} <br />
        {t('notification.part2')}
      </p>
      <Form price={price} discount={discount?.discount} id={gift.id} />
    </div>
  );
};

export default BuyGiftModalForm;
