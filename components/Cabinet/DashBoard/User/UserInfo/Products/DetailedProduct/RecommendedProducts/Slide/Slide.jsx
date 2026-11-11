import Image from 'next/image';
import Link from 'next/link';

import styles from './Slide.module.scss';
import { inter } from '@/app/[locale]/layout';
import { web_site } from '../../../../../../../../../helper/consts';

const Slide = ({ slide }) => {
  const { id, targetModule, cover, name } = slide;

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
      <Image
        src={cover || '/assets/images/aboutSergiy.webp'}
        width={122}
        height={78}
        alt={name}
        className={styles.img}
      />
      <p className={`${styles.name} ${inter.className}`}>{name}</p>
    </Link>
  );
};

export default Slide;
