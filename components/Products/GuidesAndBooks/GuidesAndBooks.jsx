import { useQuery } from '@tanstack/react-query';
import ProductsError from '../ProductsError/ProductsError';
import ProductsLoading from '../ProductsLoading/ProductsLoading';
import ProductElementInList from '../ProductElementInList/ProductElementInList';
import { base_url, BOOKS, GUIDES, OTHER_GUIDES } from '../../../helper/consts';

import styles from './GuidesAndBooks.module.scss';

const getGuidesAndBooksList = async () => {
  const res = await fetch(`${base_url}/products/guides-and-books/get-all`);
  if (!res.ok) {
    throw new Error('Failed to fetch guides and books list');
  }
  return res.json();
};

const GuidesAndBooksList = ({ showGuides, showOtherGuides, showBooks }) => {
  const {
    data: guidesAndBooks,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ['guidesAndBooks', 'public'],
    queryFn: getGuidesAndBooksList,
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes
  });

  if (isLoading) return <ProductsLoading />;
  if (isError) return <ProductsError />;

  if (!guidesAndBooks) return null;

  const filterGuidesAndBooks = () => {
    const allowedCategories = [
      showGuides && GUIDES,
      showOtherGuides && OTHER_GUIDES,
      showBooks && BOOKS,
    ].filter(Boolean); // Remove false values

    if (allowedCategories.length === 0) return guidesAndBooks; // If no categories are allowed, return an empty array
    return guidesAndBooks.filter(g => allowedCategories.includes(g.category));
  };

  return (
    <ul className={styles.guide_and_books_list}>
      {filterGuidesAndBooks().map(el => (
        <li key={el.id} className={styles.guide_and_books_list_item}>
          <ProductElementInList card={el} />
        </li>
      ))}
    </ul>
  );
};

export default GuidesAndBooksList;
