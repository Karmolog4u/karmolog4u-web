'use client';
import { useParams, usePathname } from 'next/navigation';
import { useQuery } from '@tanstack/react-query';

import Container from '@/components/Common/Container/Container';
import HeroNav from '@/components/Common/HeroNav/HeroNav';
import MeditationsDescriptions from '../../../../../../components/Products/Meditations/MeditationDetails/MeditationsDescriptions';
import { base_url } from '../../../../../../helper/consts';
import ProductionCanBeInterestingSlider from '@/components/Common/ProductionCanBeInterestingSlider/ProductionCanBeInterestingSlider';
import { useEffect } from 'react';

const getGiftById = async id => {
  const res = await fetch(`${base_url}/products/gifts/get/${id}`);
  if (!res.ok) {
    throw new Error('Помилка завантаження подарунка');
  }
  return res.json();
};

const getGifts = async () => {
  const res = await fetch(`${base_url}/products/gifts/get-all`);
  if (!res.ok) {
    throw new Error('Помилка завантаження подарунків');
  }
  return res.json();
};

const GiftDetailsPage = () => {
  const { locale, id } = useParams();
  const pathname = usePathname();

  const { data: gift, isLoading: isGiftLoading } = useQuery({
    queryKey: ['gift', id],
    queryFn: () => getGiftById(id),
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes
  });

  useEffect(() => {
    if (gift) {
      document.title = gift.name[locale];
    }
  }, [gift, locale]);

  const { data: gifts, isLoading } = useQuery({
    queryKey: ['gifts'],
    queryFn: getGifts,
    enabled: !!gift,
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes
    select: data => {
      if (!gift) return [];
      return data.filter(g => g.category === gift.category && g.id !== gift.id);
    },
  });

  if (!gift) {
    return <Container>Продукт не знайдено</Container>;
  }

  const links = [
    { href: '/products/gifts', name: { uk: 'Подарунки Студії', ru: 'Подарки Студии' } },
    { href: pathname, name: gift.name[locale] },
  ];

  return (
    <Container>
      {!isGiftLoading && !isLoading && (
        <>
          <HeroNav linkNames={links} />
          <MeditationsDescriptions product={gift} />
          {!!gifts && <ProductionCanBeInterestingSlider slides={gifts} />}
        </>
      )}
    </Container>
  );
};

export default GiftDetailsPage;
