'use client';
import { usePathname } from 'next/navigation';
import { useQuery } from '@tanstack/react-query';
import Container from '@/components/Common/Container/Container';
import HeroNav from '@/components/Common/HeroNav/HeroNav';
import MeditationsDescriptions from '@/components/Products/Meditations/MeditationDetails/MeditationsDescriptions';

import ProductionCanBeInterestingSlider from '@/components/Common/ProductionCanBeInterestingSlider/ProductionCanBeInterestingSlider';
import { base_url } from '@/helper/consts';
import { useEffect } from 'react';

const getMeditationById = async id => {
  const res = await fetch(`${base_url}/products/meditations/get/${id}`);
  if (!res.ok) {
    throw new Error('Failed to fetch meditation details');
  }
  return res.json();
};

const getMeditationsList = async () => {
  const res = await fetch(`${base_url}/products/meditations/get-all`);
  if (!res.ok) {
    throw new Error('Failed to fetch meditations list');
  }
  return res.json();
};

const MeditationDetails = ({ params }) => {
  const pathname = usePathname();
  const { locale, id } = params;

  const { data: meditation, isLoading: isMetLoading } = useQuery({
    queryKey: ['meditation', id],
    queryFn: () => getMeditationById(id),
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes
  });

  useEffect(() => {
    if (meditation) {
      document.title = meditation.name[locale];
    }
  }, [meditation, locale]);

  const { data: meditations, isLoading: isListLoading } = useQuery({
    queryKey: ['meditations'],
    queryFn: getMeditationsList,
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes
    enabled: !!meditation,
    select: data => {
      if (!meditation) return [];
      return data.filter(m => m.category === meditation.category && m.id !== meditation.id);
    },
  });

  if (!meditation) {
    return <Container>Продукт не знайдено</Container>;
  }

  const links = [
    { href: '/products/meditations', name: { uk: 'Медитації', ru: 'Медитации' } },
    {
      href: pathname,
      name: meditation.name[locale],
    },
  ];

  return (
    <Container>
      {!isMetLoading && !isListLoading && (
        <>
          <HeroNav linkNames={links} />
          <MeditationsDescriptions product={meditation} />
          {meditation && <ProductionCanBeInterestingSlider slides={meditations} />}
        </>
      )}
    </Container>
  );
};

export default MeditationDetails;
