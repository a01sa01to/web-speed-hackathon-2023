import type { FC, ReactNode } from 'react';

import styles from './Layout.module.css';

type Props = {
  children: ReactNode;
};

export const Layout: FC<Props> = ({ children }) => (
  <>
    <main className={styles.container}>{children}</main>
  </>
);
