import { useFormContext } from 'react-hook-form';

import styles from './EventsLink.module.scss';

interface FormValues {
  eventLink: string;
  paymentLink: string;
}
interface EventsLinkProps {
  name: string;
  formName: keyof FormValues;
}

const EventsLink = ({ name, formName }: EventsLinkProps) => {
  const {
    register,
    formState: { errors },
  } = useFormContext<FormValues>();
  return (
    <label className={styles.label}>
      {name}
      <input
        type="url"
        {...register(formName, {
          pattern: {
            value: /^(https?:\/\/)([\w\-]+\.)+[a-z]{2,}(\/\S*)?$/i,
            message: 'Введіть коректне посилання',
          },
        })}
        className={styles.input}
        placeholder="Вставте посилання"
      />
      {errors[formName] && <p className={styles.error}>{errors[formName]?.message}</p>}
    </label>
  );
};

export default EventsLink;
