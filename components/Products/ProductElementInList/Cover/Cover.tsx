import { useEffect, useState } from 'react';
import { useParams, usePathname } from 'next/navigation';
import { useLocale } from 'next-intl';
import Link from 'next/link';
import Youtube from 'react-youtube';
import Image from 'next/image';
import Logo from '@/components/Common/Icons/Logo';
import { ARCANES, CLOSED_MEDITATIONS, ETHERS, TRAINING, WEBINARS } from '@/helper/consts';
import { ProductCardProps } from '@/types/products';

import styles from './Cover.module.scss';

interface CoverProps {
  card: ProductCardProps;
}

const Cover = ({ card }: CoverProps) => {
  const [coverFailed, setCoverFailed] = useState(false);
  const p = usePathname();
  const params = useParams();
  const locale = useLocale();
  const { cover, isWaiting, video, category, discount = null, id, price, name } = card;
  const normalizedCover = typeof cover === 'string' ? cover.trim().replace(/\\:/g, ':') : '';
  let coverUrl = '';

  try {
    const parsedCover = new URL(normalizedCover);
    if (['http:', 'https:'].includes(parsedCover.protocol)) coverUrl = parsedCover.href;
  } catch {
    console.log('Помилка картинки ', name.uk);
  }

  useEffect(() => {
    setCoverFailed(false);
  }, [coverUrl]);

  if (video?.video && !isWaiting && [ARCANES, ETHERS].includes(category)) {
    return <Youtube videoId={video.video} iframeClassName={styles.video} />;
  }

  if (!coverUrl || coverFailed) {
    return (
      <div className={styles.waiting_card}>
        <Logo styled={styles.card_logo} />
      </div>
    );
  }

  return (
    <Link
      className={styles.cover_wrapper}
      href={`${params.id ? `${p.split('/').slice(0, -1).join('/')}/${id}` : `${p}/${id}`}`}
    >
      {coverUrl && !coverFailed && (
        <Image
          src={coverUrl}
          alt={name[locale] || 'Image'}
          className={styles.video}
          width={302}
          height={190}
          onError={() => setCoverFailed(true)}
        />
      )}
      {[CLOSED_MEDITATIONS, WEBINARS, TRAINING].includes(category) && price && discount && (
        <span className={styles.discount}>-{Math.round((discount.discount * 100) / price)}%</span>
      )}
    </Link>
  );
};

export default Cover;
