import { useErrorHandler } from 'react-error-boundary';
import { useMutation } from 'urql';

import type { UpdateItemInShoppingCartMutationResponse } from '../graphql/mutations';
import { UpdateItemInShoppingCartMutation } from '../graphql/mutations';

export const useUpdateCartItem = () => {
  const handleError = useErrorHandler();
  const [updateCardItemResult, updateCartItem] = useMutation<UpdateItemInShoppingCartMutationResponse>(
    UpdateItemInShoppingCartMutation,
  );
  if (updateCardItemResult.error) handleError(updateCardItemResult.error);

  return { updateCartItem };
};
