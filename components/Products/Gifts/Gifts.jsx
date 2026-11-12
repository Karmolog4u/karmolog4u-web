'use client';

import { useQuery } from '@tanstack/react-query';

import { base_url } from '../../../helper/consts';

import styles from './Gifts.module.scss';
import ProductsLoading from '../ProductsLoading/ProductsLoading';
import ProductsError from '../ProductsError/ProductsError';
import ProductElementInList from '../ProductElementInList/ProductElementInList';

const getGifts = async () => {
  const res = await fetch(`${base_url}/products/gifts/get-all`);
  if (!res.ok && res.status === 404) {
    throw new Error('Подарунки не знайдено');
  }
  if (!res.ok) {
    throw new Error(res.statusText || 'Помилка при отриманні подарунків');
  }
  return res.json();
};

const Gifts = () => {
  const {
    data: gifts,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ['gifts', 'public'],
    queryFn: () => getGifts(),
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes
  });

  if (isLoading) return <ProductsLoading />;
  if (isError) return <ProductsError error={error.message} />;

  return (
    <ul className={styles.gifts_list}>
      {gifts.map(el => (
        <li key={el.id} className={styles.gifts_list_item}>
          <ProductElementInList card={el} gift={true} />
        </li>
      ))}
    </ul>
  );
};

export default Gifts;
