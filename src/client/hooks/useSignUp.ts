import { useMutation } from 'urql';

import { SignUpMutation } from '../graphql/mutations';

export const useSignUp = () => {
  const [, signUp] = useMutation(SignUpMutation);

  return { signUp };
};
