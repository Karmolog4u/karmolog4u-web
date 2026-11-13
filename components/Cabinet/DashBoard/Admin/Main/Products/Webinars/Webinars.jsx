'use client';

import { useEffect, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useSession } from 'next-auth/react';
import Filter from './Filter/Filter';
import SkeletonProducts from '../SkeletonProducts/SkeletonProducts';
import Status from '../Meditations/Status/Status';
import WebinarsList from './WebinarsList/WebinarsList';

import { ADMIN_ETHERS, ADMIN_TRAINING, ADMIN_WEBINARS, base_url } from '@/helper/consts';
import styles from './Webinars.module.scss';

const fetchWebinars = async token => {
  const response = await fetch(`${base_url}/admin/products/webinars/get-all`, {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    throw new Error('Помилка завантаження вебінарів');
  }
  return response.json();
};

const Webinars = () => {
  const [showWebinars, setShowWebinars] = useState(false);
  const [showEthers, setShowEthers] = useState(false);
  const [showTraining, setShowTraining] = useState(false);
  const [isCheckedLS, setIsCheckedLS] = useState(false);
  const [status, setStatus] = useState('all');
  const { data: token } = useSession();

  const {
    data: webinars,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ['webinars', 'admin'],
    queryFn: () => fetchWebinars(token.accessToken),
  });

  useEffect(() => {
    if (!isCheckedLS) {
      setShowWebinars(() => JSON.parse(window.localStorage.getItem(ADMIN_WEBINARS)) ?? true);
      setShowEthers(() => JSON.parse(window.localStorage.getItem(ADMIN_ETHERS)) ?? true);
      setShowTraining(() => JSON.parse(window.localStorage.getItem(ADMIN_TRAINING)) ?? true);
      setIsCheckedLS(true);
    }
  }, [isCheckedLS]);

  if (isError) return <div>Error...</div>;

  return (
    <div className={styles.wrapper}>
      <Filter
        webinars={showWebinars}
        setWebinars={setShowWebinars}
        showEthers={showEthers}
        setShowEthers={setShowEthers}
        showTraining={showTraining}
        setShowTraining={setShowTraining}
      />
      <Status activeStatus={status} setActiveStatus={setStatus} products={webinars} />
      {isLoading ? (
        <SkeletonProducts />
      ) : (
        <WebinarsList
          showWebinars={showWebinars}
          showEthers={showEthers}
          isCheckedLS={isCheckedLS}
          status={status}
          webinars={webinars}
          showTraining={showTraining}
        />
      )}
    </div>
  );
};

export default Webinars;
