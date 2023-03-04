import type { FC } from 'react';
import { useContext } from 'react';
import { FaShoppingCart, FaUser } from 'react-icons/fa';

import { useAuthUser } from '../../../hooks/useAuthUser';
import { modalContext } from '../../../store/modal';
import { Anchor } from '../../foundation/Anchor';
import { Icon } from '../../foundation/Icon';
import { Image } from '../../foundation/Image';

import * as styles from './Header.styles';

export const Header: FC = () => {
  const ctx = useContext(modalContext);
  const { isAuthUser } = useAuthUser();
  const handleOpenModal = () => ctx.setModalState('SIGN_IN');

  return (
    <header className={styles.container()}>
      <Anchor href="/">
        <div className={styles.logo()}>
          <Image height={32} src="/icons/logo.svg" width={205} />
        </div>
      </Anchor>
      {isAuthUser ? (
        <Anchor data-testid="navigate-order" href={'/order'}>
          <div className={styles.orderLink()}>
            <Icon IconType={FaShoppingCart} color="#222222" height={20} width={20} />
          </div>
        </Anchor>
      ) : (
        <button className={styles.signInButton()} data-testid="navigate-signin" onClick={handleOpenModal}>
          <Icon IconType={FaUser} color="#222222" height={20} width={20} />
        </button>
      )}
    </header>
  );
};
