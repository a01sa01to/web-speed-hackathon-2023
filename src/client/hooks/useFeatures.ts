import { useQuery } from 'urql';

export const useFeatures = () => {
  const [featuresResult] = useQuery<{ features: { id: number; title: string }[] }>({
    query: `
    query {
      features {
        id
        title
      }
    }
  `,
  });
  if (featuresResult.fetching) return { features: [], loading: true };
  else
    return {
      features: featuresResult.data?.features.map((f) => [true, { id: f.id, title: f.title }]) ?? [],
      loading: false,
    };
};
