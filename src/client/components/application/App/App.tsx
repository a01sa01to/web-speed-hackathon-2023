import type { FC } from 'react';
import { BrowserRouter } from 'react-router-dom';

import { SignInModal } from '../../modal/SignInModal';
import { SignUpModal } from '../../modal/SignUpModal';
import { Footer } from '../../navigators/Footer/Footer';
import { Header } from '../../navigators/Header/Header';
import { Providers } from '../Providers';
import Routes from '../Routes';

export const App: FC = () => (
  <Providers>
    <BrowserRouter>
      <Header />
      <Routes />
      <SignInModal />
      <SignUpModal />
      <Footer />
    </BrowserRouter>
  </Providers>
);
