import { useTranslations } from 'next-intl';
import styles from './Courses.module.scss';

const CoursesCheckboxes = ({
  showWebinars,
  setShowWebinars,
  showTraining,
  setShowTraining,
  showEthers,
  setShowEthers,
}) => {
  const t = useTranslations('Author_products.courses.checkboxes');
  return (
    <ul className={styles.list}>
      <li>
        <div className={styles.checkbox_wrapper}>
          <input
            type="checkbox"
            id="check-1"
            checked={showWebinars}
            onChange={e => {
              setShowWebinars(e.target.checked);
              window.localStorage.setItem('showWebinars', JSON.stringify(e.target.checked));
            }}
          />
          <label htmlFor="check-1">
            <svg viewBox="0,0,50,50">
              <path d="M5 30 L 20 45 L 45 5"></path>
            </svg>
          </label>
          <p className={styles.text}>{t('webinars')}</p>
        </div>
      </li>
      <li>
        <div className={styles.checkbox_wrapper}>
          <input
            type="checkbox"
            id="check-2"
            checked={showTraining}
            onChange={e => {
              setShowTraining(e.target.checked);
              window.localStorage.setItem('showTraining', JSON.stringify(e.target.checked));
            }}
          />
          <label htmlFor="check-2">
            <svg viewBox="0,0,50,50">
              <path d="M5 30 L 20 45 L 45 5"></path>
            </svg>
          </label>
          <p className={styles.text}>{t('intensive')}</p>
        </div>
      </li>
      <li>
        <div className={styles.checkbox_wrapper}>
          <input
            type="checkbox"
            id="check-3"
            checked={showEthers}
            onChange={e => {
              setShowEthers(e.target.checked);
              window.localStorage.setItem('showEthers', JSON.stringify(e.target.checked));
            }}
          />
          <label htmlFor="check-3">
            <svg viewBox="0,0,50,50">
              <path d="M5 30 L 20 45 L 45 5"></path>
            </svg>
          </label>
          <p className={styles.text}>{t('therapeutic_ethers')}</p>
        </div>
      </li>
    </ul>
  );
};

export default CoursesCheckboxes;
