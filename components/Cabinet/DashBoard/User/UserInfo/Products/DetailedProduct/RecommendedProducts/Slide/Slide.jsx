import { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import Logo from '@/components/Common/Icons/Logo';
import { inter } from '@/app/[locale]/layout';
import { web_site } from '../../../../../../../../../helper/consts';

import styles from './Slide.module.scss';

const Slide = ({ slide }) => {
  const [coverFailed, setCoverFailed] = useState(false);
  const { id, targetModule, cover, name } = slide;
  const normalizedCover = typeof cover === 'string' ? cover.trim().replace(/\\:/g, ':') : '';
  let coverUrl = '/assets/images/aboutSergiy.webp';

  try {
    const parsedCover = new URL(normalizedCover);
    if (['http:', 'https:'].includes(parsedCover.protocol)) coverUrl = parsedCover.href;
  } catch {
    // Invalid image URLs use the local fallback image.
  }

  useEffect(() => {
    setCoverFailed(false);
  }, [coverUrl]);

  const productType = {
    Webinars: 'courses',
    GuidesAndBooks: 'guides-and-books',
    Meditations: 'meditations',
  };

  return (
    <Link
      href={`${web_site}/products/${productType[targetModule]}/${id}`}
      target="_blank"
      rel="noreferrer noopener"
      className={`${styles.link}`}
    >
      {coverFailed ? (
        <div className={styles.waiting_card}>
          <Logo styled={styles.card_logo} />
        </div>
      ) : (
        <Image
          src={coverUrl}
          width={122}
          height={78}
          alt={name}
          className={styles.img}
          onError={() => setCoverFailed(true)}
        />
      )}
      <p className={`${styles.name} ${inter.className}`}>{name}</p>
    </Link>
  );
};

export default Slide;
