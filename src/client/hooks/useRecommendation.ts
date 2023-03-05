import { useQuery } from 'urql';

import type { GetRecommendationsQueryResponse } from '../graphql/queries';
import { GetRecommendationsQuery } from '../graphql/queries';

export const useRecommendation = () => {
  const [recommendationsResult] = useQuery<GetRecommendationsQueryResponse>({ query: GetRecommendationsQuery });
  if (recommendationsResult.fetching) return { loading: true, recommendation: undefined };

  const hour = new Date().getUTCHours();
  const recommendations = recommendationsResult?.data?.recommendations;

  if (recommendations == null) return { recommendation: undefined };

  const recommendation = recommendations[hour % recommendations.length];
  return { recommendation };
};
