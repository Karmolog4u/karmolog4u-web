import { useQuery } from '@tanstack/react-query';
import ProductElementInList from '../ProductElementInList/ProductElementInList';
import ProductsLoading from '../ProductsLoading/ProductsLoading';
import ProductsError from '../ProductsError/ProductsError';
import { base_url, ETHERS, WEBINARS } from '../../../helper/consts';

import styles from './Courses.module.scss';
import HealthMapProduct from '../HealthMapProduct/HealthMapProduct';

const getWebinarsList = async () => {
  const res = await fetch(`${base_url}/products/webinars/get-all`);
  if (!res.ok) {
    throw new Error('Failed to fetch meditations list');
  }
  return res.json();
};

const CoursesList = ({ showWebinars, showIntensives, showEthers }) => {
  const {
    data: webinars,
    isError,
    isLoading,
  } = useQuery({
    queryKey: ['webinars', 'public'],
    queryFn: getWebinarsList,
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes
  });

  if (!webinars) return null;

  const filterWebinars = () => {
    const allowedCategories = [
      showWebinars && WEBINARS,
      showIntensives && 'intensive',
      showEthers && ETHERS,
    ].filter(Boolean); // Remove false values

    if (allowedCategories.length === 0) return webinars; // If no categories are allowed, return an empty array
    return webinars.filter(webinar => allowedCategories.includes(webinar.category));
  };

  if (isLoading) return <ProductsLoading />;
  if (isError) return <ProductsError />;

  return (
    <ul className={styles.courses_list}>
      {filterWebinars().map(el => (
        <li key={el.id} className={styles.courses_list_item}>
          <ProductElementInList card={el} />
        </li>
      ))}
      {(showIntensives || (!showWebinars && !showEthers && !showIntensives)) && (
        <li className={styles.courses_list_item}>
          <HealthMapProduct />
        </li>
      )}
    </ul>
  );
};

export default CoursesList;
