import type { ComponentProps, FC } from 'react';

import styles from './Anchor.module.css';

type Props = Omit<ComponentProps<'a'>, 'className'>;

export const Anchor: FC<Props> = ({ children, href, ...rest }) => (
  <a className={styles.container} href={href} {...rest}>
    {children}
  </a>
);
