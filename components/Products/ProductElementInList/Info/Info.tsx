import { useParams, usePathname } from 'next/navigation';
import Link from 'next/link';
import { useLocale, useTranslations } from 'next-intl';
import {
  ARCANES,
  BOOKS,
  CLOSED_MEDITATIONS,
  ETHERS,
  GUIDES,
  OTHER_GUIDES,
  WEBINARS,
} from '@/helper/consts';
import { ProductCardProps } from '@/types/products';

import styles from './Info.module.scss';

interface InfoProps {
  card: ProductCardProps;
  setShowModal: (value: boolean) => void;
}

const Info = ({ card, setShowModal }: InfoProps) => {
  const p = usePathname();
  const params = useParams();
  const t = useTranslations('Author_products.meditations.list');
  const locale = useLocale();

  const { name, price, isWaiting, discount, category, id, video } = card;

  const getDiscountPrice = () => {
    if (!discount || !price) return '';
    return price - discount.discount;
  };

  const showSellButtonCategories = [CLOSED_MEDITATIONS, WEBINARS, GUIDES, BOOKS, OTHER_GUIDES];

  const openInNewTab = category === ETHERS && Boolean(video?.playlist);
  const getLink = () => {
    if (openInNewTab && video?.playlist)
      return `https://youtube.com/watch?v=${video.video}${video.playlist ? `&list=${video.playlist}` : ''}`;
    return `${params.id ? `${p.split('/').slice(0, -1).join('/')}/${id}` : `${p}/${id}`}`;
  };

  const isPlainText = [ARCANES].includes(category) || (category === ETHERS && !video?.playlist);

  return (
    <div className={styles.info_wrapper}>
      <div className={styles.text_wrapper}>
        {isPlainText ? (
          <p className={styles.name}>
            {name[locale]}
            {isWaiting && <span>({t('isWaiting')})</span>}
          </p>
        ) : (
          <Link
            href={getLink()}
            className={styles.name}
            target={openInNewTab ? '_blank' : undefined}
            rel={openInNewTab ? 'noopener noreferrer' : undefined}
          >
            {name[locale]}
            {isWaiting && <span>({t('isWaiting')})</span>}
          </Link>
        )}
        {Number(price) > 0 && (
          <div className={styles.price_wrapper}>
            {discount && <p className={styles.price}>{getDiscountPrice()}€</p>}
            <p className={`${styles.price} ${discount?.discount ? styles.discount : ''}`}>
              {price}€
            </p>
          </div>
        )}
      </div>
      {(showSellButtonCategories.includes(category) || !category) && Number(price) > 0 && (
        <button
          className={styles.button}
          aria-label={t('aria_label')}
          onClick={() => setShowModal(true)}
        >
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 25 24" fill="none">
            <path
              d="M18.5 6C18.5 4.4087 17.8679 2.88258 16.7426 1.75736C15.6174 0.632141 14.0913 0 12.5 0C10.9087 0 9.38258 0.632141 8.25736 1.75736C7.13214 2.88258 6.5 4.4087 6.5 6H0.5V21C0.5 21.7956 0.81607 22.5587 1.37868 23.1213C1.94129 23.6839 2.70435 24 3.5 24H21.5C22.2956 24 23.0587 23.6839 23.6213 23.1213C24.1839 22.5587 24.5 21.7956 24.5 21V6H18.5ZM12.5 2C13.5609 2 14.5783 2.42143 15.3284 3.17157C16.0786 3.92172 16.5 4.93913 16.5 6H8.5C8.5 4.93913 8.92143 3.92172 9.67157 3.17157C10.4217 2.42143 11.4391 2 12.5 2ZM22.5 21C22.5 21.2652 22.3946 21.5196 22.2071 21.7071C22.0196 21.8946 21.7652 22 21.5 22H3.5C3.23478 22 2.98043 21.8946 2.79289 21.7071C2.60536 21.5196 2.5 21.2652 2.5 21V8H6.5V10H8.5V8H16.5V10H18.5V8H22.5V21Z"
              fill="#101010"
            />
          </svg>
        </button>
      )}
    </div>
  );
};

export default Info;
