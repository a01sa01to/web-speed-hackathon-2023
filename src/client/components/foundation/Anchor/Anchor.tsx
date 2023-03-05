import type { ComponentProps } from 'react';
import { Link } from 'react-router-dom';

import styles from './Anchor.module.css';

export const Anchor = ({
  children,
  href,
  ...rest
}: {
  children: ComponentProps<typeof Link>['children'];
  href: ComponentProps<typeof Link>['to'];
} & Omit<ComponentProps<typeof Link>, 'children' | 'to'>): JSX.Element => (
  <Link className={styles.container} to={href as string} {...rest}>
    {children}
  </Link>
);
