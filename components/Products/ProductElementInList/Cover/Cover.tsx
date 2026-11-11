import Youtube from 'react-youtube';
import Logo from '@/components/Common/Icons/Logo';
import Image from 'next/image';
import { ARCANES, CLOSED_MEDITATIONS, ETHERS } from '@/helper/consts';
import { ProductCardProps } from '@/types/products';

import styles from './Cover.module.scss';
import Link from 'next/link';
import { useParams, usePathname } from 'next/navigation';

interface CoverProps {
  card: ProductCardProps;
}

const Cover = ({ card }: CoverProps) => {
  const p = usePathname();
  const params = useParams();
  const { cover, isWaiting, video, category, discount = null, id } = card;

  if ((isWaiting && !cover) || (!cover && !video && !cover?.startsWith('http'))) {
    return (
      <div className={styles.waiting_card}>
        <Logo styled={styles.card_logo} />
      </div>
    );
  }
  if (!isWaiting && video && [ARCANES, ETHERS].includes(category)) {
    return <Youtube videoId={video.video} iframeClassName={styles.video} />;
  }
  return (
    <Link
      className={styles.cover_wrapper}
      href={`${params.id ? `${p.split('/').slice(0, -1).join('/')}/${id}` : `${p}/${id}`}`}
    >
      <Image src={cover!} alt="Cover" className={styles.video} width={302} height={190} />
      {category === CLOSED_MEDITATIONS && discount && (
        <span className={styles.discount}>-{discount.discount}%</span>
      )}
    </Link>
  );
};

export default Cover;
