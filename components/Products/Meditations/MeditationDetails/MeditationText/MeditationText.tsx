import { useLocale } from 'next-intl';
import TitleNoStyles from '@/components/Common/TitleNoStyles/TitleNoStyles';
import PaymentSection from './PaymentSection/PaymentSection';
import HowToGetIt from './HowToGetIt/HowToGetIt';
import { CLOSED_MEDITATIONS, WEBINARS } from '@/helper/consts';

import styles from './MeditationText.module.scss';
import DetailsDescription from './DetailsDescription/DetailsDescription';

interface MeditationTextProps {
  name: { [key: string]: string };
  description?: { [key: string]: string };
  setShowModal: (show: boolean) => void;
  price: number;
  category: string;
  discount?: { discount: number };
  detailsDescription?: { [key: string]: string };
  detailsTitle?: { [key: string]: string };
}

const MeditationText = ({
  name,
  description,
  setShowModal,
  price,
  category,
  discount,
  detailsDescription,
}: MeditationTextProps) => {
  const locale = useLocale();

  return (
    <div className={styles.text_wrapper}>
      <TitleNoStyles styled={styles.title}>{name[locale]}</TitleNoStyles>
      {Number(price) > 0 && (
        <PaymentSection setShowModal={setShowModal} price={price} discount={discount} />
      )}
      {description && <p className={styles.text}>{description[locale]}</p>}
      {[CLOSED_MEDITATIONS, WEBINARS].includes(category) && <HowToGetIt />}
      {detailsDescription && <DetailsDescription detailsDescription={detailsDescription} />}
    </div>
  );
};

export default MeditationText;
