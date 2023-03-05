import { useErrorHandler } from 'react-error-boundary';
import { useQuery } from 'urql';

import type { GetProductDetailsQueryResponse } from '../graphql/queries';
import { GetProductDetailsQuery } from '../graphql/queries';

export const useProduct = (productId: number) => {
  const handleError = useErrorHandler();
  const [productResult] = useQuery<GetProductDetailsQueryResponse>({
    query: GetProductDetailsQuery,
    variables: {
      productId,
    },
  });
  if (productResult.error) handleError(productResult.error);
  if (productResult.fetching) return { loading: true, product: undefined };

  const product = productResult.data?.product;

  return { product };
};
