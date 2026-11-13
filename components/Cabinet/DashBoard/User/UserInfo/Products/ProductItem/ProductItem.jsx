import { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import Logo from '@/components/Common/Icons/Logo';

import styles from './ProductItem.module.scss';

const ProductItem = ({ item, type, link }) => {
  const [coverFailed, setCoverFailed] = useState(false);
  const { name, cover, id } = item;
  const normalizedCover = typeof cover === 'string' ? cover.trim().replace(/\\:/g, ':') : '';
  let coverUrl = '';

  try {
    const parsedCover = new URL(normalizedCover);
    if (['http:', 'https:'].includes(parsedCover.protocol)) coverUrl = parsedCover.href;
  } catch {
    // Invalid image URLs use the placeholder below.
  }

  useEffect(() => {
    setCoverFailed(false);
  }, [coverUrl]);

  const isShowLogo = !coverUrl || coverFailed;
  return (
    <li className={styles.list_item}>
      {isShowLogo ? (
        <div className={styles.waiting_card}>
          <Logo styled={styles.card_logo} />
        </div>
      ) : (
        <Image
          src={coverUrl}
          width={132}
          height={126}
          alt={name}
          className={styles.img}
          onError={() => setCoverFailed(true)}
        />
      )}
      <div className={styles.text_wrapper}>
        <p className={styles.type}>{type}</p>
        <p className={styles.name}>{name}</p>
        <Link href={`${link}/${id}`} className={`${styles.link}`}>
          Деталі...
        </Link>
      </div>
    </li>
  );
};

export default ProductItem;
