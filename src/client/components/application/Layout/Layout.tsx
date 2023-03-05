import type { FC, ReactNode } from 'react';

import { Footer } from '../../navigators/Footer/Footer';
import { Header } from '../../navigators/Header/Header';

import styles from './Layout.module.css';

type Props = {
  children: ReactNode;
};

export const Layout: FC<Props> = ({ children }) => (
  <>
    <Header />
    <main className={styles.container}>{children}</main>
    <Footer />
  </>
);
