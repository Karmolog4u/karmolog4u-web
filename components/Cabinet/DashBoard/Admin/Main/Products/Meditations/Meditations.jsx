'use client';

import { useEffect, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useSession } from 'next-auth/react';
import Filter from './Filter/Filter';
import MeditationsList from './MeditationsList/MeditationsList';
import Status from './Status/Status';
import SkeletonProducts from '../SkeletonProducts/SkeletonProducts';

import { ADMIN_CLOSED, ADMIN_ENERGIES, ADMIN_OPENED, base_url } from '@/helper/consts';
import styles from './Meditations.module.scss';

const fetchMeditations = async token => {
  const response = await fetch(`${base_url}/admin/products/meditations/get-all`, {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    throw new Error('Помилка завантаження медитацій');
  }
  return response.json();
};

const Meditations = () => {
  const [energies, setEnergies] = useState(false);
  const [showOpenedMeditation, setShowOpenedMeditation] = useState(false);
  const [showClosedMeditation, setShowClosedMeditation] = useState(false);
  const [isCheckedLS, setIsCheckedLS] = useState(false);
  const [status, setStatus] = useState('all');
  const { data: token } = useSession();

  const {
    data: meditations,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ['meditations'],
    queryFn: () => fetchMeditations(token.accessToken),
    enabled: !!token?.accessToken,
  });

  useEffect(() => {
    if (!isCheckedLS) {
      setEnergies(() => JSON.parse(window.localStorage.getItem(ADMIN_ENERGIES)) ?? true);
      setShowOpenedMeditation(() => JSON.parse(window.localStorage.getItem(ADMIN_OPENED)) ?? true);
      setShowClosedMeditation(() => JSON.parse(window.localStorage.getItem(ADMIN_CLOSED)) ?? true);
      setIsCheckedLS(true);
    }
  }, [isCheckedLS]);

  if (isError) return <div>Error...</div>;

  if (!meditations || !isCheckedLS) return null;

  return (
    <div className={styles.wrapper}>
      <Filter
        energies={energies}
        setEnergies={setEnergies}
        showOpenedMeditation={showOpenedMeditation}
        setShowOpenedMeditation={setShowOpenedMeditation}
        showClosedMeditation={showClosedMeditation}
        setShowClosedMeditation={setShowClosedMeditation}
      />
      <Status activeStatus={status} setActiveStatus={setStatus} products={meditations} />
      {isLoading ? (
        <SkeletonProducts />
      ) : (
        <MeditationsList
          energies={energies}
          opened={showOpenedMeditation}
          closed={showClosedMeditation}
          isCheckedLS={isCheckedLS}
          status={status}
          meditations={meditations}
        />
      )}
    </div>
  );
};

export default Meditations;
