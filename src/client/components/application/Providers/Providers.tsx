import type { FC, ReactNode } from 'react';
import { Suspense } from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import { Provider } from 'urql';

import { Fallback } from '../../../pages/Fallback';
import { modalContext, useModal } from '../../../store/modal';
import { urqlClient } from '../../../utils//apollo_client';

type Props = {
  children: ReactNode;
};

export const Providers: FC<Props> = ({ children }) => {
  const ctx = useModal();
  return (
    <Provider value={urqlClient}>
      <modalContext.Provider value={ctx}>
        <ErrorBoundary fallbackRender={Fallback}>
          <Suspense fallback={null}>{children}</Suspense>
        </ErrorBoundary>
      </modalContext.Provider>
    </Provider>
  );
};
