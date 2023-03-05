import { useMutation } from 'urql';

import { SignInMutation } from '../graphql/mutations';

export const useSignIn = () => {
  const [, signIn] = useMutation(SignInMutation);

  return { signIn };
};
