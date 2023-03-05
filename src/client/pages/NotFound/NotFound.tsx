import type { FC } from 'react';
import { Helmet } from 'react-helmet';

import { Layout } from '../../components/application/Layout';

import styles from './NotFound.module.css';

export const NotFound: FC = () => {
  return (
    <>
      <link href="https://fonts.googleapis.com" rel="preconnect" />
      <link crossOrigin="crossorigin" href="https://fonts.gstatic.com" rel="preconnect" />
      <link
        href={`https://fonts.googleapis.com/css2?family=Noto+Serif+JP:wght@700&display=swap&text=${encodeURIComponent(
          'ページが存在しません',
        )}`}
        rel="stylesheet"
      />
      <link
        href={`https://fonts.googleapis.com/css2?family=Noto+Serif+JP:wght@400&display=swap&text=${encodeURIComponent(
          'Not Found',
        )}`}
        rel="stylesheet"
      />
      <Helmet>
        <title>ページが見つかりませんでした</title>
      </Helmet>
      <Layout>
        <div className={styles.container}>
          <div className={styles.inner}>
            <p className={styles.mainParagraph}>ページが存在しません</p>
            <p className={styles.subParagraph}>Not Found</p>
          </div>
        </div>
      </Layout>
    </>
  );
};
