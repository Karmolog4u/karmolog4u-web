import { useQuery } from '@tanstack/react-query';
import ProductsLoading from '../ProductsLoading/ProductsLoading';
import { ARCANES, base_url, CLOSED_MEDITATIONS, OPENED_MEDITATIONS } from '../../../helper/consts';

import styles from './Meditations.module.scss';
import ProductsError from '../ProductsError/ProductsError';
import ProductElementInList from '../ProductElementInList/ProductElementInList';

const getMeditationsList = async () => {
  const res = await fetch(`${base_url}/products/meditations/get-all`);
  if (!res.ok) {
    throw new Error('Failed to fetch meditations list');
  }
  return res.json();
};

const MeditationsList = ({ energies, showOpenedMeditation, showClosedMeditation }) => {
  const {
    data: meditations,
    isError,
    isLoading,
  } = useQuery({
    queryKey: ['meditations', 'public'],
    queryFn: getMeditationsList,
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes
  });

  if (!meditations) return null;

  const filterMeditations = () => {
    const allowedCategories = [
      energies && ARCANES,
      showClosedMeditation && CLOSED_MEDITATIONS,
      showOpenedMeditation && OPENED_MEDITATIONS,
    ].filter(Boolean); // Remove false values

    if (allowedCategories.length === 0) return meditations; // If no categories are allowed, return an empty array
    return meditations.filter(meditation => allowedCategories.includes(meditation.category));
  };

  if (isLoading) return <ProductsLoading />;
  if (isError) return <ProductsError />;

  return (
    <ul className={styles.meditation_list}>
      {filterMeditations().map(el => (
        <li key={el.id} className={styles.meditation_list_item}>
          <ProductElementInList card={el} />
        </li>
      ))}
    </ul>
  );
};

export default MeditationsList;
