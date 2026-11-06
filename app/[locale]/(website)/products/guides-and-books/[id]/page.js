'use client';
import { useParams, usePathname } from 'next/navigation';
import { useQuery } from '@tanstack/react-query';
import Container from '@/components/Common/Container/Container';
import HeroNav from '@/components/Common/HeroNav/HeroNav';
import MeditationsDescriptions from '@/components/Products/Meditations/MeditationDetails/MeditationsDescriptions';
import ProductionCanBeInterestingSlider from '@/components/Common/ProductionCanBeInterestingSlider/ProductionCanBeInterestingSlider';
import { base_url } from '../../../../../../helper/consts';
import { useEffect } from 'react';

const getGuideAndBookById = async id => {
  const res = await fetch(`${base_url}/products/guides-and-books/get/${id}`);
  if (!res.ok) {
    throw new Error('Failed to fetch meditation details');
  }
  return res.json();
};

const getGuidesAndBooksList = async () => {
  const res = await fetch(`${base_url}/products/guides-and-books/get-all`);
  if (!res.ok) {
    throw new Error('Failed to fetch meditations list');
  }
  return res.json();
};

const GuideAndBooksDetails = () => {
  const pathname = usePathname();
  const params = useParams();

  const { data: guideAndBook, isLoading: isGnBLoading } = useQuery({
    queryKey: ['guideAndBook', params.id],
    queryFn: () => getGuideAndBookById(params.id),
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes
  });

  useEffect(() => {
    if (guideAndBook) {
      document.title = guideAndBook.name[params.locale];
    }
  }, [guideAndBook, params.locale]);

  const { data: guidesAndBooks, isLoading: isListLoading } = useQuery({
    queryKey: ['guidesAndBooks'],
    queryFn: getGuidesAndBooksList,
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes
    enabled: !!guideAndBook,
    select: data => {
      if (!guideAndBook) return [];
      return data.filter(g => g.category === guideAndBook.category && g.id !== guideAndBook.id);
    },
  });

  if (!guideAndBook) {
    return <Container>Продукт не знайдено</Container>;
  }

  const links = [
    { href: '/products/guides-and-books', name: 'Гайди та книги' },
    { href: pathname, name: guideAndBook.name[params.locale] },
  ];

  return (
    <Container>
      <HeroNav linkNames={links} />
      <MeditationsDescriptions product={guideAndBook} />
      {!isGnBLoading && !isListLoading && (
        <ProductionCanBeInterestingSlider slides={guidesAndBooks} />
      )}
    </Container>
  );
};

export default GuideAndBooksDetails;
