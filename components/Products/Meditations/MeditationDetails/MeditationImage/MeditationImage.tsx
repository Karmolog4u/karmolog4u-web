import Image from 'next/image';
import Youtube from 'react-youtube';
import Logo from '@/components/Common/Icons/Logo';

import styles from './MeditationImage.module.scss';
import { useState } from 'react';
import Link from 'next/link';

interface MeditationImageProps {
  video: { video: string; playlist?: string };
  cover: string;
}

const MeditationImage = ({ video, cover }: MeditationImageProps) => {
  const [error, setError] = useState(false);
  if ((!video && !cover && !cover?.startsWith('http')) || error) {
    return (
      <div className={styles.no_image}>
        <Logo styled={styles.logo} />
      </div>
    );
  }

  return (
    <div>
      {video ? (
        <Youtube videoId={video.video} iframeClassName={styles.video} />
      ) : (
        <Image
          src={cover}
          alt="Meditation cover"
          width={736}
          height={462}
          className={styles.video}
          onError={() => setError(true)}
          unoptimized
        />
      )}
      {video && video.playlist && (
        <Link
          href={`https://www.youtube.com/watch?v=${video.video}&list=${video.playlist}&index=5`}
          target="_blank"
          className={styles.redirect_link}
        >
          Переглянути весь плейлист
        </Link>
      )}
    </div>
  );
};

export default MeditationImage;
