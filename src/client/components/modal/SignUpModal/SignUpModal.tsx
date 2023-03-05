import type { FC } from 'react';
import { useContext, useState } from 'react';

import { useAuthUser } from '../../../hooks/useAuthUser';
import { useSignUp } from '../../../hooks/useSignUp';
import { modalContext } from '../../../store/modal';
import { Modal } from '../../foundation/Modal';
import { PrimaryButton } from '../../foundation/PrimaryButton';
import { TextInput } from '../../foundation/TextInput';

import styles from './SignUpModal.module.css';

const NOT_INCLUDED_AT_CHAR_REGEX = /^(?:[^@]*){6,}$/;
const NOT_INCLUDED_SYMBOL_CHARS_REGEX = /^(?:(?:[a-zA-Z0-9]*){2,})+$/;

export type SignUpForm = {
  email: string;
  name: string;
  password: string;
};

export const SignUpModal: FC = () => {
  const ctx = useContext(modalContext);

  const isOpened = ctx.key === 'SIGN_UP';
  const { reloadQuery: reloadUser } = useAuthUser();
  const { signUp } = useSignUp();

  const handleOpenModal = () => ctx.setModalState('SIGN_IN');
  const handleCloseModal = () => ctx.setModalState(undefined);

  const [submitError, setSubmitError] = useState<Error | null>(null);
  const [form, setForm] = useState<SignUpForm>({ email: '', name: '', password: '' });
  const [error, setError] = useState<SignUpForm>({ email: '', name: '', password: '' });
  const onSubmit = async (e: any) => {
    e.preventDefault();
    try {
      await signUp({
        email: form.email,
        name: form.name,
        password: form.password,
      }).then(() => reloadUser({ requestPolicy: 'network-only' }));
      setForm({ email: '', name: '', password: '' });
      setSubmitError(null);
      handleCloseModal();
    } catch (err) {
      setSubmitError(err as Error);
    }
  };
  const validate = (target: string, value: string) => {
    if (target === 'email') setError((prev) => ({ ...prev, email: '' }));
    if (target === 'name') setError((prev) => ({ ...prev, name: '' }));
    if (target === 'password') setError((prev) => ({ ...prev, password: '' }));

    if (target === 'email' && value != '' && NOT_INCLUDED_AT_CHAR_REGEX.test(value)) {
      setError((prev) => ({ ...prev, email: 'メールアドレスの形式が間違っています' }));
    }
    if (target === 'password' && value != '' && NOT_INCLUDED_SYMBOL_CHARS_REGEX.test(value)) {
      setError((prev) => ({ ...prev, password: '英数字以外の文字を含めてください' }));
    }
  };

  return (
    <Modal onHide={handleCloseModal} show={isOpened}>
      <div className={styles.inner}>
        <header className={styles.header}>
          <h2 className={styles.heading}>会員登録</h2>
          <button
            className={styles.switchToSignInButton}
            data-testid="modal-switch-to-signin"
            onClick={handleOpenModal}
          >
            ログイン
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
            <p className={styles.error}>{error.email}</p>

            <TextInput
              required
              id="name"
              label="名前"
              onChange={(e) => {
                setForm((prev) => ({ ...prev, name: e.target.value }));
                validate('name', e.target.value);
              }}
              placeholder="名前を入力"
              type="text"
              value={form.name}
            />
            <p className={styles.error}>{error.name}</p>

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
            <p className={styles.error}>{error.password}</p>
          </div>
          <div className={styles.submitButton}>
            <PrimaryButton size="base" type="submit">
              登録する
            </PrimaryButton>
          </div>
          {submitError ? <p className={styles.error}>会員登録に失敗しました</p> : null}
        </form>
      </div>
    </Modal>
  );
};
