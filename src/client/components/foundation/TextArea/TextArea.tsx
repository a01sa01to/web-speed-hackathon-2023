import type { ComponentProps, FC } from 'react';

import styles from './TextArea.module.css';

type Props = Omit<ComponentProps<'textarea'>, 'className'> & {
  label: string;
};

export const TextArea: FC<Props> = ({ label, ...rest }) => (
  <label className={styles.container}>
    <span>{label}</span>
    <textarea className={styles.textarea} {...rest} />
  </label>
);
