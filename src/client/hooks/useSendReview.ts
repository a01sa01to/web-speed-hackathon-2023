import { useErrorHandler } from 'react-error-boundary';
import { useMutation } from 'urql';

import type { SendReviewMutationResponse } from '../graphql/mutations';
import { SendReviewMutation } from '../graphql/mutations';

export const useSendReview = () => {
  const handleError = useErrorHandler();
  const [sendReviewResult, sendReview] = useMutation<SendReviewMutationResponse>(SendReviewMutation);
  if (sendReviewResult.error) handleError(sendReviewResult.error);
  return { sendReview };
};
