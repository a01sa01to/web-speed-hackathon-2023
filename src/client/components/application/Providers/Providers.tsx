import { ApolloProvider, SuspenseCache } from '@apollo/client';
import type { FC, ReactNode } from 'react';
import { Suspense } from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import { BrowserRouter } from 'react-router-dom';

import { Fallback } from '../../../pages/Fallback';
import { modalContext, useModal } from '../../../store/modal';
import { apolloClient } from '../../../utils//apollo_client';

type Props = {
  children: ReactNode;
};

const suspenseCache = new SuspenseCache();

export const Providers: FC<Props> = ({ children }) => {
  const ctx = useModal();
  return (
    <ApolloProvider client={apolloClient} suspenseCache={suspenseCache}>
      <BrowserRouter>
        <modalContext.Provider value={ctx}>
          <ErrorBoundary fallbackRender={Fallback}>
            <Suspense fallback={null}>{children}</Suspense>
          </ErrorBoundary>
        </modalContext.Provider>
      </BrowserRouter>
    </ApolloProvider>
  );
};
