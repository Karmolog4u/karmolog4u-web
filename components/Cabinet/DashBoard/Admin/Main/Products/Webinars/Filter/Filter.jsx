import Tick from '../../Meditations/Filter/Tick';
import { ADMIN_ETHERS, ADMIN_TRAINING, ADMIN_WEBINARS } from '@/helper/consts';

import styles from './Filter.module.scss';

const Filter = ({
  webinars,
  setWebinars,
  showEthers,
  setShowEthers,
  showTraining,
  setShowTraining,
}) => {
  return (
    <ul className={styles.list}>
      <li>
        <Tick
          name={'Вебінари'}
          setTick={setWebinars}
          localStorageName={ADMIN_WEBINARS}
          id={41}
          tick={webinars}
        />
      </li>
      <li>
        <Tick
          name={'Тренінг'}
          setTick={setShowTraining}
          localStorageName={ADMIN_TRAINING}
          id={42}
          tick={showTraining}
        />
      </li>
      <li>
        <Tick
          name={'Терапевтичні ефіри'}
          setTick={setShowEthers}
          localStorageName={ADMIN_ETHERS}
          id={43}
          tick={showEthers}
        />
      </li>
    </ul>
  );
};

export default Filter;
