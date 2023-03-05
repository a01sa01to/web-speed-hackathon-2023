import type { FC } from 'react';
import { useContext, useState } from 'react';

import { useAuthUser } from '../../../hooks/useAuthUser';
import { useSignIn } from '../../../hooks/useSignIn';
import { modalContext } from '../../../store/modal';
import { Modal } from '../../foundation/Modal';
import { PrimaryButton } from '../../foundation/PrimaryButton';
import { TextInput } from '../../foundation/TextInput';

import styles from './SignInModal.module.css';

const NOT_INCLUDED_AT_CHAR_REGEX = /^(?:[^@]*){6,}$/;
const NOT_INCLUDED_SYMBOL_CHARS_REGEX = /^(?:(?:[a-zA-Z0-9]*){2,})+$/;

export type SignInForm = {
  email: string;
  password: string;
};

export const SignInModal: FC = () => {
  const ctx = useContext(modalContext);

  const isOpened = ctx.key === 'SIGN_IN';
  const { reloadQuery: reloadUser } = useAuthUser();
  const { signIn } = useSignIn();

  const handleOpenModal = () => ctx.setModalState('SIGN_UP');
  const handleCloseModal = () => ctx.setModalState(undefined);

  const [submitError, setSubmitError] = useState<Error | null>(null);
  const [form, setForm] = useState<SignInForm>({ email: '', password: '' });
  const [errors, setErrors] = useState<SignInForm>({ email: '', password: '' });
  const onSubmit = async (e: any) => {
    e.preventDefault();
    try {
      await signIn({
        email: form.email,
        password: form.password,
      }).then(() => reloadUser({ requestPolicy: 'network-only' }));
      setForm({ email: '', password: '' });
      setSubmitError(null);
      handleCloseModal();
    } catch (err) {
      setSubmitError(err as Error);
    }
  };
  const validate = (target: string, value: string) => {
    if (target === 'email') setErrors((prev) => ({ ...prev, email: '' }));
    if (target === 'password') setErrors((prev) => ({ ...prev, password: '' }));
    if (target === 'email' && value != '' && NOT_INCLUDED_AT_CHAR_REGEX.test(value)) {
      setErrors((prev) => ({ ...prev, email: 'メールアドレスの形式が間違っています' }));
    }
    if (target === 'password' && value != '' && NOT_INCLUDED_SYMBOL_CHARS_REGEX.test(value)) {
      setErrors((prev) => ({ ...prev, password: '英数字以外の文字を含めてください' }));
    }
  };

  return (
    <Modal onHide={handleCloseModal} show={isOpened}>
      <div className={styles.inner}>
        <header className={styles.header}>
          <h2 className={styles.heading}>ログイン</h2>
          <button
            className={styles.switchToSignUpButton}
            data-testid="modal-switch-to-signup"
            onClick={handleOpenModal}
          >
            会員登録
          </button>
        </header>
        <form action="#" className={styles.form} onSubmit={onSubmit}>
          <div className={styles.inputList}>
            <TextInput
              required
              id="email"
              label="メールアドレス"
              onChange={(e) => {
                setForm((prev) => ({ ...prev, email: e.target.value }));
                validate('email', e.target.value);
              }}
              placeholder="メールアドレスを入力"
              type="email"
              value={form.email}
            />
            <p className={styles.error}>{errors.email}</p>

            <TextInput
              required
              id="password"
              label="パスワード"
              onChange={(e) => {
                setForm((prev) => ({ ...prev, password: e.target.value }));
                validate('password', e.target.value);
              }}
              placeholder="パスワードを入力"
              type="password"
              value={form.password}
            />
            <p className={styles.error}>{errors.password}</p>
          </div>
          <div className={styles.submitButton}>
            <PrimaryButton size="base" type="submit">
              ログイン
            </PrimaryButton>
          </div>
          {submitError != null ? <p className={styles.error}>ログインに失敗しました</p> : null}
        </form>
      </div>
    </Modal>
  );
};
