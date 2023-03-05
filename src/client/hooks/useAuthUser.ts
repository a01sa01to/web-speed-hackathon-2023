import { useQuery } from 'urql';

import type { GetUserAuthQueryResponse } from '../graphql/queries';
import { GetAuthUserQuery } from '../graphql/queries';

export const useAuthUser = () => {
  const [authUserResult, reloadQuery] = useQuery<GetUserAuthQueryResponse>({ query: GetAuthUserQuery });
  const authUser = authUserResult.data?.me;
  const authUserLoading = authUserResult.fetching;
  const isAuthUser = !!authUser;

  return { authUser, authUserLoading, isAuthUser, reloadQuery };
};
