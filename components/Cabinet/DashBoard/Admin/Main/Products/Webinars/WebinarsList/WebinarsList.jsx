'use client';

import { useEffect, useState } from 'react';

import { DRAFT, ETHERS, HIDDEN, PUBLISHED, TRAINING, WEBINARS } from '@/helper/consts';
import EditButton from './EditButton/EditButton';

import styles from './WebinarsList.module.scss';

const statusInfo = [
  { orig_name: PUBLISHED, web_name: 'Опубліковано' },
  { orig_name: HIDDEN, web_name: 'Приховано' },
  { orig_name: DRAFT, web_name: 'Чернетка' },
];
const WebinarsList = ({
  showWebinars,
  showEthers,
  isCheckedLS,
  status,
  webinars,
  showTraining,
}) => {
  const [list, setList] = useState([]);

  useEffect(() => {
    if (!isCheckedLS) return;
    const sortedByCategory = [
      ...(showWebinars ? webinars.filter(el => el.category.includes(WEBINARS)) : []),
      ...(showEthers ? webinars.filter(el => el.category.includes(ETHERS)) : []),
      ...(showTraining ? webinars.filter(el => el.category.includes(TRAINING)) : []),
    ];

    const finalList = [
      ...(status === 'all'
        ? sortedByCategory
        : sortedByCategory.filter(el => el.status === status)),
    ];
    setList(finalList);
  }, [isCheckedLS, showEthers, showTraining, showWebinars, status, webinars]);

  return (
    <ul className={styles.list}>
      {list.map(({ _id: id, status, name }) => {
        const statusItem = statusInfo.find(el => el.orig_name === status);

        return (
          <li key={id} className={styles.item}>
            <div className={styles.manage_wrapper}>
              <p className={`${styles.status} ${styles[`status_${statusItem.orig_name}`]}`}>
                {statusItem.web_name}
              </p>
              <EditButton id={id} name={name.uk} status={status} />
            </div>
            <p className={styles.name}>{name.uk}</p>
          </li>
        );
      })}
    </ul>
  );
};

export default WebinarsList;
