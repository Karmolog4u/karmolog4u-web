import { useState } from 'react';
import MeditationImage from './MeditationImage/MeditationImage';
import ModalBuyForm from '../../ModalBuyForm/ModalBuyForm';
import styles from './MeditationsDescriptions.module.scss';
import MeditationText from './MeditationText/MeditationText';
import SimpleModalContainer from '../../../Common/SimpleModalContainer/SimpleModalContainer';
import BuyGiftModalForm from '@/components/Products/BuyGiftModalForm/BuyGiftModalForm';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const MeditationsDescriptions = ({ product }) => {
  const [showModal, setShowModal] = useState(false);
  const { video, cover, name, description, price, category, discount, detailsDescription } =
    product;


  return (
    <div className={styles.wrapper}>
      <MeditationImage video={video} cover={cover} />
      <MeditationText
        name={name}
        description={description}
        setShowModal={setShowModal}
        price={price}
        category={category}
        discount={discount}
        detailsDescription={detailsDescription}
      />
      {showModal && (
        <SimpleModalContainer setShowModal={setShowModal}>
          {category ? <ModalBuyForm card={product} /> : <BuyGiftModalForm gift={product} />}
        </SimpleModalContainer>
      )}
      <ToastContainer />
    </div>
  );
};

export default MeditationsDescriptions;
