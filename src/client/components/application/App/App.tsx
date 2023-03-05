import type { FC } from 'react';
import { lazy, Suspense } from 'react';

import { SignInModal } from '../../modal/SignInModal';
import { SignUpModal } from '../../modal/SignUpModal';
import { Providers } from '../Providers';
const Routes = lazy(() => import('../Routes'));

export const App: FC = () => (
  <Providers>
    <Suspense>
      <Routes />
    </Suspense>
    <SignInModal />
    <SignUpModal />
  </Providers>
);
