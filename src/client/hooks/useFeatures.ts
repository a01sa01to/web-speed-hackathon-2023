import { useQuery } from '@apollo/client';

import type { GetFeatureSectionsQueryResponse } from '../graphql/queries';
import { GetFeatureSectionsQuery } from '../graphql/queries';

export const useFeatures = () => {
  const featuresResult = useQuery<GetFeatureSectionsQueryResponse>(GetFeatureSectionsQuery);
  if (featuresResult.loading) return { features: undefined, loading: true };

  const features = featuresResult.data?.features;
  return { features };
};
