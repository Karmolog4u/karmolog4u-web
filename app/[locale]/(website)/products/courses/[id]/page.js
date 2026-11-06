'use client';
import { useParams, usePathname } from 'next/navigation';
import { useQuery } from '@tanstack/react-query';

import Container from '@/components/Common/Container/Container';
import HeroNav from '@/components/Common/HeroNav/HeroNav';
import MeditationsDescriptions from '@/components/Products/Meditations/MeditationDetails/MeditationsDescriptions';
import ProductionCanBeInterestingSlider from '@/components/Common/ProductionCanBeInterestingSlider/ProductionCanBeInterestingSlider';
import { base_url } from '../../../../../../helper/consts';
import { useEffect } from 'react';

const getWebinarById = async id => {
  const res = await fetch(`${base_url}/products/webinars/get/${id}`);
  if (!res.ok) {
    throw new Error('Failed to fetch meditation details');
  }
  return res.json();
};

const getWebinarsList = async () => {
  const res = await fetch(`${base_url}/products/webinars/get-all`);
  if (!res.ok) {
    throw new Error('Failed to fetch meditations list');
  }
  return res.json();
};

const CoursesDetails = () => {
  const { locale, id } = useParams();
  const pathname = usePathname();

  const { data: webinar, isLoading: isWebLoading } = useQuery({
    queryKey: ['webinar', id],
    queryFn: () => getWebinarById(id),
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes
  });

  useEffect(() => {
    if (webinar) {
      document.title = webinar.name[locale];
    }
  }, [webinar, locale]);

  const { data: webinars, isLoading: isListLoading } = useQuery({
    queryKey: ['webinars'],
    queryFn: getWebinarsList,
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes
    enabled: !!webinar,
    select: data => {
      if (!webinar) return [];
      return data.filter(w => w.category === webinar.category && w.id !== webinar.id);
    },
  });

  if (!webinar) {
    return <Container>Продукт не знайдено</Container>;
  }

  const links = [
    { href: '/products/courses', name: { uk: 'Навчальні курси', ru: 'Учебные курсы' } },
    { href: pathname, name: webinar.name },
  ];

  return (
    <Container>
      {!isWebLoading && !isListLoading && (
        <>
          <HeroNav linkNames={links} />
          <MeditationsDescriptions product={webinar} />
          <ProductionCanBeInterestingSlider slides={webinars} />
        </>
      )}
    </Container>
  );
};

export default CoursesDetails;
