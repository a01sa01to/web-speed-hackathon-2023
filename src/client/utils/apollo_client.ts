import { createClient } from 'urql';

export const urqlClient = createClient({
  suspense: true,
  url: '/graphql',
});
