import { gql, useQuery } from '@apollo/client';

export const useFeatures = () => {
  const featuresResult = useQuery<{ features: { id: number }[] }>(gql`
    query {
      features {
        id
      }
    }
  `);
  if (featuresResult.loading) return { features: [], loading:true };
  else return { features: featuresResult.data?.features.map((f) => [true, { id: f.id }]) ?? [], loading:false };
};
