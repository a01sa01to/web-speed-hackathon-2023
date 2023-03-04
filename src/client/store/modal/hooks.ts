import { createContext, useCallback, useState } from 'react';

export type ModalKey = 'SIGN_UP' | 'SIGN_IN';

type ModalState = {
  key: ModalKey | undefined;
  setModalState: (modalKey: ModalKey | undefined) => void;
};

const defaultContext: ModalState = {
  key: undefined,
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  setModalState: () => {},
};

export const modalContext = createContext<ModalState>(defaultContext);

// custom Hook
export const useModal = (): ModalState => {
  const [key, setModal] = useState<ModalKey | undefined>(undefined);
  const setModalState = useCallback((current: ModalKey | undefined): void => {
    setModal(current);
  }, []);
  return {
    key,
    setModalState,
  };
};
