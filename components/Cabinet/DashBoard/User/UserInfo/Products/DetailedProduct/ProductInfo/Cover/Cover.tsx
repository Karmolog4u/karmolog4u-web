import Link from 'next/link';
import YouTube from 'react-youtube';

import Logo from '@/components/Common/Icons/Logo';

import styles from './Cover.module.scss';
import Image from 'next/image';

interface CoverProps {
  video?: {
    video: string;
    playlist?: string;
  };
  link?: string;
  cover?: string;
  name: {
    uk: string;
  };
  showLogo?: boolean;
}

const Cover = ({ video, link, cover, name }: CoverProps) => {
  const showLogo = !cover || !cover?.startsWith('http');
  return (
    <div>
      {video?.video ? (
        <YouTube
          videoId={video.video}
          iframeClassName={styles.video}
          opts={{
            playerVars: { controls: 1, rel: 0 },
            width: '100%',
            height: '100%',
          }}
        />
      ) : link ? (
        <Link
          href={link}
          target="_blank"
          rel="noopener noreferrer"
          className={styles.detailed_link}
        >
          Переглянути деталі
        </Link>
      ) : !showLogo ? (
        <Image src={cover || ''} width={312} height={208} alt={name.uk} className={styles.img} />
      ) : (
        <div className={styles.waiting_card}>
          <Logo styled={styles.card_logo} />
        </div>
      )}
      {video?.playlist && (
        <Link
          href={`https://www.youtube.com/watch?v=${video.video}&list=${video.playlist}`}
          target="_blank"
          rel="noopener noreferrer"
          className={styles.redirect_link}
        >
          Переглянути весь плейлист
        </Link>
      )}
    </div>
  );
};

export default Cover;
