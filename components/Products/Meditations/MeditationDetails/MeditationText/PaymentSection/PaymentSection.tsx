import { open_Sans } from '@/app/[locale]/fonts';
import styles from './PaymentSection.module.scss';
import { tgLink } from '@/helper/consts';

interface PaymentSectionProps {
  price: number;
  setShowModal: (show: boolean) => void;
  discount?: { discount: number };
}
const PaymentSection = ({ price, setShowModal, discount }: PaymentSectionProps) => {
  const getPriceWithDiscount = () => {
    if (!discount || !price) return '';
    return price - (price * discount.discount) / 100;
  };
  return (
    <div className={styles.wrapper}>
      <div className={styles.price_wrapper}>
        <p className={`${styles.price} ${discount?.discount && styles.discount}`}>{price}€</p>
        {discount && <p className={styles.price}>{getPriceWithDiscount()}€</p>}
      </div>
      <button
        className={`${styles.button} ${open_Sans.className}`}
        onClick={() => {
          setShowModal(false);
          window.open(tgLink, '_blank', 'noopener,noreferrer');
        }}
      >
        Придбати
      </button>
    </div>
  );
};

export default PaymentSection;
