import { useErrorHandler } from 'react-error-boundary';
import { useMutation } from 'urql';

import type { OrderItemsInShoppingCartMutationResponse } from '../graphql/mutations';
import { OrderItemsInShoppingCartMutation } from '../graphql/mutations';

export const useSubmitOrder = () => {
  const handleError = useErrorHandler();
  const [submitOrderResult, submitOrder] = useMutation<OrderItemsInShoppingCartMutationResponse>(
    OrderItemsInShoppingCartMutation,
  );
  if (submitOrderResult.error) handleError(submitOrderResult.error);

  return { submitOrder };
};
