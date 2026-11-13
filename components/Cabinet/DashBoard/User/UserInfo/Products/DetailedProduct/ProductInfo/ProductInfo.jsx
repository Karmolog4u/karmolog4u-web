'use client';

import { usePathname, useRouter } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { useSession } from 'next-auth/react';
import YouTube from 'react-youtube';
import TitleNoStyles from '../../../../../../../Common/TitleNoStyles/TitleNoStyles';
import { BOOKS, CLOSED_MEDITATIONS, GUIDES, OTHER_GUIDES, WEBINARS } from '@/helper/consts';
import { useFileDownload } from '@/hooks/useFileDownload';
import Logo from '@/components/Common/Icons/Logo';

import styles from './ProductInfo.module.scss';
import Cover from './Cover/Cover';

const ProductInfo = ({ product }) => {
  const router = useRouter();
  const pathName = usePathname();
  const { data: token } = useSession();

  const {
    video = null,
    cover,
    name,
    category,
    description,
    detailsTitle = null,
    detailsDescription = null,
    file = null,
    link = null,
  } = product;

  const categoriesMap = {
    [CLOSED_MEDITATIONS]: 'Медитація',
    [WEBINARS]: 'Вебінар',
    [OTHER_GUIDES]: 'Гайд',
    [BOOKS]: 'Книга',
    [GUIDES]: 'Гайд 22 енегрії',
  };

  const { mutate: downloadFile } = useFileDownload(token?.accessToken || '');
  return (
    <div className={styles.main_wrapper}>
      <button
        className={styles.back_button}
        onClick={() => router.push(pathName.substring(0, pathName.lastIndexOf('/')))}
      >
        <svg viewBox="0 0 10 10" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M3.82227 0.572266C4.05765 0.289917 4.47753 0.252068 4.76074 0.487305C5.04336 0.723312 5.08102 1.14313 4.8457 1.42578L1.8623 5.00684L4.73828 8.58105C4.96888 8.86763 4.92413 9.28784 4.6377 9.51855C4.51447 9.6178 4.36693 9.66593 4.21973 9.66602C4.02506 9.66602 3.83153 9.58099 3.7002 9.41699L0.481445 5.41699C0.282218 5.16966 0.284984 4.81622 0.488281 4.57227L3.82227 0.572266ZM8.48828 0.573242C8.72428 0.289914 9.1444 0.251985 9.42773 0.487305C9.71036 0.722607 9.74793 1.14312 9.5127 1.42578L6.5293 5.00684L9.40527 8.58105C9.63583 8.86759 9.591 9.28716 9.30469 9.51855C9.18148 9.61779 9.03324 9.66592 8.88672 9.66602C8.69215 9.66602 8.49821 9.58113 8.36621 9.41797L5.14746 5.41797C4.94881 5.17066 4.952 4.81657 5.15527 4.57324L8.48828 0.573242Z" />
        </svg>
        До списку
      </button>
      <div className={`${styles.info_wrapper}`}>
        <div className={`${styles.info_wrapper} ${styles.additional_info_wrapper}`}>
          <Cover video={video} link={link} cover={cover} name={name} />
          <div className={`${styles.info_wrapper}`}>
            <div className={styles.download_wrapper}>
              <p className={styles.category}>{categoriesMap[category]}</p>
              {file && (
                <button
                  onClick={() =>
                    downloadFile({
                      originalName: file.originalName,
                      savedName: file?.path?.split('/').pop(),
                    })
                  }
                  className={styles.download_button}
                >
                  <svg viewBox="0 0 16 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                      d="M15 13C15.55 13 16 13.45 16 14V16C16 16.55 15.55 17 15 17H1C0.45 17 0 16.55 0 16V14C0 13.45 0.45 13 1 13C1.55 13 2 13.45 2 14V15H14V14C14 13.45 14.45 13 15 13ZM8 0C8.553 0 9 0.448 9 1V8.99902L11.4004 7.2002C11.8424 6.86733 12.4688 6.95844 12.7998 7.40039C13.1317 7.84238 13.0416 8.46884 12.5996 8.7998L8.59961 11.7998C8.42264 11.9327 8.21094 12 8 12C7.79901 12 7.5978 11.9393 7.4248 11.8184L3.4248 9.00391C2.97308 8.68596 2.86402 8.06224 3.18164 7.61133C3.49964 7.15933 4.1232 7.05016 4.5752 7.36816L7.00293 9.0752C7.00108 9.05037 7 9.0253 7 9V1C7 0.448 7.447 0 8 0Z"
                      fill="#FDFDFD"
                      fillOpacity="0.5"
                    />
                  </svg>
                </button>
              )}
            </div>
            <TitleNoStyles styled={styles.name}>{name.uk}</TitleNoStyles>
          </div>
        </div>
        <p className={styles.description}>{description.uk}</p>
        {detailsTitle && detailsDescription && (
          <div className={`${styles.info_wrapper}`}>
            <TitleNoStyles styled={styles.detailed_title} variant="h3">
              {detailsTitle.uk}
            </TitleNoStyles>
            <p className={styles.description}>{detailsDescription.uk}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductInfo;
