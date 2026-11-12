import { useLocale } from 'next-intl';

import styles from './HowToGetIt.module.scss';

const list = {
  title: { uk: 'ЯК ОТРИМАТИ ПРОДУКТ?', ru: 'КАК ПОЛУЧИТЬ ПРОДУКТ?' },
  text: {
    uk: [
      'Натисніть на кнопку “Придбати” та заповніть дані, вказавши ім’я, електронну адресу та номер мобільного телефону.',
      'Здійсніть оплату вибраного матеріалу.',
      'Одразу після успішної транзакції вам на пошту прийде лист з інформацією',
    ],
    ru: [
      'Нажмите на кнопку "Купить" и заполните данные, указав имя, электронный адрес и номер мобильного телефона.',
      'Оплатите выбранный материал.',
      'После успешной транзакции, вы получите электронное письмо с информациею',
    ],
  },
};
const HowToGetIt = () => {
  const locale = useLocale() as 'uk' | 'ru';
  const { title, text } = list;
  return (
    <div className={styles.wrapper}>
      <h2 className={styles.title}>{title[locale]}</h2>
      <ul className={styles.list}>
        {text[locale].map((el, index) => (
          <li key={index}>
            <p className={styles.text}>
              {index + 1}. {el}
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default HowToGetIt;
