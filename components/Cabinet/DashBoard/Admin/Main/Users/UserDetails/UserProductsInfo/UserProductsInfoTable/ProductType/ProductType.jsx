import styles from './ProductType.module.scss';

const ProductType = ({ rowData }) => {
  const { targetModule } = rowData;
  const map = {
    Meditations: { text: 'Медитація', style: styles.meditation },
    Webinars: { text: 'Вебінар', style: styles.webinar },
    GuidesAndBooks: { text: 'Гайд або книга', style: '' },
  };

  const { text, style } = map[targetModule] || { text: 'Гайд або книга', style: '' };

  return <p className={`${styles.type} ${style}`}>{text}</p>;
};

export default ProductType;
