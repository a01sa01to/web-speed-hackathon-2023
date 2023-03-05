import classNames from 'classnames';
import type { FC } from 'react';

import { Anchor } from '../Anchor';

import styles from './PrimaryAnchor.module.css';

type Size = 'base' | 'lg';
type Props = {
  size: Size;
  href: string;
  children: string;
};

export const PrimaryAnchor: FC<Props> = ({ children, href, size }) => (
  <Anchor href={href}>
    <span
      className={classNames(styles.inner, {
        [styles.container__lg]: size === 'lg',
        [styles.container__base]: size === 'base',
      })}
    >
      {children}
    </span>
  </Anchor>
);
