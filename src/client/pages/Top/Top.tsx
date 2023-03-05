import type { FC } from 'react';
import { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';

import { Layout } from '../../components/application/Layout';
import { ProductList } from '../../components/feature/ProductList';
import { ProductHeroImage } from '../../components/product/ProductHeroImage';
import type { FeatureSectionFragmentResponse } from '../../graphql/fragments';
import { useFeatures } from '../../hooks/useFeatures';
import { useRecommendation } from '../../hooks/useRecommendation';

import styles from './Top.module.css';

export const Top: FC = () => {
  const { loading: loadingRecommendation, recommendation } = useRecommendation();

  const { features: _features, loading: featuresLoading } = useFeatures();
  const [features, setFeatures] = useState(_features);

  useEffect(() => {
    setFeatures(_features);
    if (!featuresLoading) {
      _features.forEach(async ([loading, featureSection], idx) => {
        if (loading) {
          await fetch(`${location.origin}/graphql`, {
            body: JSON.stringify({
              query: `query GetFeature($id:Int!){feature(id:$id){id title items{id product{id media{isThumbnail id file{filename id}}name offers{endDate id price startDate}price}}}}`,
              variables: { id: (featureSection as { id: number }).id },
            }),
            headers: {
              'Content-Type': 'application/json',
            },
            method: 'POST',
          })
            .then((res) => res.json())
            .then((res) => {
              const feature = res.data.feature;
              setFeatures((prevfeature) => [
                ...prevfeature.slice(0, idx),
                [false, feature],
                ...prevfeature.slice(idx + 1),
              ]);
            });
        }
      });
    }
  }, [featuresLoading]);

  return (
    <>
      <Helmet>
        <title>買えるオーガニック</title>
      </Helmet>
      <Layout>
        <div>
          {loadingRecommendation ? (
            <div>Loading...</div>
          ) : (
            recommendation && <ProductHeroImage product={recommendation.product} title="今週のオススメ" />
          )}

          <div className={styles.featureList}>
            {!features ? (
              <div>Loading...</div>
            ) : (
              features.map(([_loading, _featureSection]) => {
                const loading = _loading as boolean;
                const featureSection = _featureSection as FeatureSectionFragmentResponse;
                return (
                  <div key={featureSection.id} className={styles.feature}>
                    <h2 className={styles.featureHeading}>{featureSection.title}</h2>
                    {loading ? (
                      <div style={{ height: '206px', width: '100%' }} />
                    ) : (
                      <ProductList featureSection={featureSection} />
                    )}
                  </div>
                );
              })
            )}
          </div>
        </div>
      </Layout>
    </>
  );
};
