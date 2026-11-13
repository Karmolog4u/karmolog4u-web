import { open_Sans } from '@/app/[locale]/fonts';
import styles from './PaymentSection.module.scss';
import { useTranslations } from 'next-intl';

interface PaymentSectionProps {
  price: number;
  setShowModal: (show: boolean) => void;
  discount?: { discount: number };
}
const PaymentSection = ({ price, setShowModal, discount }: PaymentSectionProps) => {
  const t = useTranslations('Author_products.meditations.list');
  const getDiscountPrice = () => {
    if (!discount || !price) return '';
    return price - discount.discount;
  };
  return (
    <div className={styles.wrapper}>
      <div className={styles.price_wrapper}>
        <p className={`${styles.price} ${discount?.discount && styles.discount}`}>{price}€</p>
        {discount && <p className={styles.price}>{getDiscountPrice()}€</p>}
      </div>
      <button
        className={`${styles.button} ${open_Sans.className}`}
        onClick={() => setShowModal(true)}
      >
        {t('buy_button')}
      </button>
    </div>
  );
};

export default PaymentSection;
